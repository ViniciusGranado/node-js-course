const Product = require('../models/product');

module.exports.getAddProduct = (req, res) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeProduct: true,
  });
};

module.exports.postAddProduct = (req, res) => {
  console.log(req.body);
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );

  product.save();

  res.redirect('/');
};

module.exports.getProducts = (req, res) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
};

