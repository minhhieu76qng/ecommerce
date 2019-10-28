const http = require('http');
require('dotenv').config();

const app = require('./app/app');

const server = http.createServer(app);

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 5000;

server.listen(PORT, HOST, function () {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});