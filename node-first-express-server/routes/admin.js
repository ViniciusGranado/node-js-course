const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();
const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeProduct: true,
  });
});

router.post('/add-product', (req, res, next) => {
  products.push(req.body);
  res.redirect('/');
});

module.exports.routes = router;
module.exports.products = products;
