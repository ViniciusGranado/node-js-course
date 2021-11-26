const products = [];

module.exports.getAddProduct = (req, res) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeProduct: true,
  });
};

module.exports.postAddProduct = (req, res) => {
  products.push(req.body);
  res.redirect('/');
}

module.exports.getProducts = (req, res) => {
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
}

module.exports.products = products;
