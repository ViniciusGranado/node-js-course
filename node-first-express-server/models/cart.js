const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(require.main.filename), 'data', 'cart.json');

module.exports = class Cart {
  static getCart(callback) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      callback(cart);
    });
  }

  static addProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }

      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );

      const existingProduct = cart.products.find(
        (product) => product.id === id
      );

      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty++;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = {
          id: id,
          qty: 1,
        };

        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice += Number.parseFloat(price);

      fs.writeFile(p, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }

      const updatedCart = JSON.parse(fileContent);

      const product = updatedCart.products.find((product) => product.id === id);

      if (!product) {
        return;
      }

      updatedCart.totalPrice -= productPrice * product.qty;
      updatedCart.products = updatedCart.products.filter((product) => {
        return product.id !== id;
      });

      fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
        console.log(err);
      });
    });
  }
};
