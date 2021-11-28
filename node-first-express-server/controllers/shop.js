const Product = require('../models/product');
const Cart = require('../models/cart');

module.exports.getProducts = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

module.exports.getProduct = (req, res) => {
  const id = req.params.id;

  Product.findById(id, (product) => {
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products',
    });
  });
};

module.exports.getIndex = (req, res) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch((err) => {
      console.log(err)
    });
};

module.exports.getCart = (req, res) => {
  Cart.getCart((cart) => {
    Product.fetchAll()
      .then(([rows, fieldData]) => {
        const cartProducts = [];

        for (product of rows) {
          const cartProductData = cart.products.find(
            (prod) => prod.id === product.id
          );

          if (cartProductData) {
            cartProducts.push({ productData: product, qty: cartProductData.qty });
          }
        }

        res.render('shop/cart', {
          prods: rows,
          pageTitle: 'Cart',
          path: '/cart'
        });
      })
      .catch((err) => {
        console.log(err)
      });
  });
};

module.exports.postCart = (req, res) => {
  const id = req.body.id;

  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  });

  res.redirect('/cart');
};

module.exports.postCartDelete = (req, res) => {
  const id = req.body.id;

  Product.findById(id, (product) => {
    Cart.deleteProduct(id, product.price);
  });

  res.redirect('/cart');
};

module.exports.getOrders = (req, res) => {
  res.render('shop/orders', {
    pageTitle: 'Your Orders',
    path: '/orders',
  });
};

module.exports.getCheckout = (req, res) => {
  res.render('shop/checkout', {
    pageTitle: 'Checkout',
    path: '/Checkout',
  });
};
