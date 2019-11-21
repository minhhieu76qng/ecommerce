const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const httpCode = require('http-status-codes');
const exphbs = require('express-handlebars');

require('module-alias/register');
require('./configs/passport');
require('./configs/mongoose');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('hbs', exphbs());
app.set('view engine', 'hbs');
app.set('views', `${__dirname}\\views`);

app.get('/', (req, res, next) => {
  res.end('dd');
});

app.get('/d', (req, res, next) => {
  res.json({
    a: 'as',
  });
});

app.use('/api', require('./apis/index.api'));

app.use((req, res, next) => {
  return res.status(httpCode.NOT_FOUND).json({
    errors: [{
      message: 'Api not found!'
    }]
  })
})

module.exports = app;
