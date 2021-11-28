const Cart = require('./cart');
const database = require('../util/database');

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    (this.id = id), (this.title = title);
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  save() {

  }

  static fetchAll() {
    return database.execute('SELECT * FROM product');
  }

  static findById(id, callback) {

  }

  static deleteById(id) {

  }
};
