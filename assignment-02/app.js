const express = require('express');

const app = express();

app.use('/users', (req, res, next) => {
  console.log('First middleware');
  res.send('<h1>This is the USERS page</h1>');
});

app.use('/', (req, res, next) => {
  console.log('Second middleware');
  res.send('<h1>This is the HOME page</h1>');
});

app.listen(3000)