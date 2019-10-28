const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  res.end('dd');
})

app.use('/api', require('./apis/index.api'));

module.exports = app;