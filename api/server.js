const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const { auth } = require('../utils');
const usersRouter = require('../users/users-router');
const plantsRouter = require('../plants/plants-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ message: `api is live` });
});

server.use('/api/users', auth, usersRouter);
server.use('/api/plants', plantsRouter);

module.exports = server;
