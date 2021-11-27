const fs = require('fs');
const path = require('path');

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
  constructor(title, price, description) {
    this.title = title;
    this.price = price;
    this.description = description;
  }

  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), (err) => {
        if (err) {
          console.log(err);
        };
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
