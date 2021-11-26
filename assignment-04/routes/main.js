const express = require('express');

const routes = express.Router();

const users = [];

routes.get('/users', (req, res) => {
  res.render('users', { pageTitle: 'Users', users });
});

routes.get('/', (req, res) => {
  res.render('index', { pageTitle: 'Home' });
});

routes.post('/', (req, res) => {
  users.push(req.body);
  console.log(users);
  res.redirect('/users');
});

module.exports = routes;
