const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes/main');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

app.use(routes);

app.listen(3000);
