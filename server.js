const express = require('express');

const AccountRouter = require('./accounts-router');

const server = express();

server.use(express.json());

server.use('/accounts', AccountRouter);

server.get('/', (req, res) => {
  res.send('<h3>DB Helpers with knex</h3>');
});

module.exports = server;