const Product = require('../models/product');

module.exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

module.exports.postAddProduct = (req, res) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );

  product.save();

  res.redirect('/');
};

module.exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (editMode !== 'true') {
    return res.redirect('/');
  }

  const id = req.params.id;
  Product.findById(id, (product) => {
    if (!product) {
      return res.redirect('/');
    }

    res.render('admin/edit-product', {
      product: product,
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode === 'true',
    });
  });
};

module.exports.postEditProduct = (req, res) => {
  const updatedProduct = new Product(
    req.body.id,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );

  updatedProduct.save();

  res.redirect(`/admin/products`);
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

module.exports.postDeleteProduct = (req, res) => {
  Product.deleteById(req.body.id);

  res.redirect('/admin/products');
}
