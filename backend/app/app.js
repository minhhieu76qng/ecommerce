const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('module-alias/register');
require('./configs/passport');
require('./configs/mongoose');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
  res.end('dd');
});

app.get('/d', (req, res, next) => {
  res.json({
    a: 'as',
  });
});

app.use('/api', require('./apis/index.api'));

module.exports = app;
