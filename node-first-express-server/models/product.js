const fs = require('fs');
const path = require('path');
const { threadId } = require('worker_threads');
const Cart = require('./cart');

const p = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return callback([]);
    }

    callback(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    (this.id = id), (this.title = title);
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        return fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
          if (err) {
            console.log(err);
          }
        });
      }

      this.id = Math.floor(Math.random() * (999 - 111) + 111).toString();
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === id;
      });

      callback(product);
    });
  }

  static deleteById(id) {
    getProductsFromFile((products) => {
      const product = products.find((product) => {
        return product.id === id;
      });

      const updatedProducts = products.filter((product) => {
        return product.id !== id;
      });

      fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
        if (err) {
          return console.log(err);
        }

        Cart.deleteProduct(id, product.price);
      });
    });
  }
};
