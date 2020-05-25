const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { makeToken, auth } = require('../utils');
const User = require('./users-model');

router.post('/register', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 12);

  req.body.password = hash;
  User.add(req.body)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  User.findby({ username })
    .first()
    .then((found) => {
      if (found && bcrypt.compareSync(password, found.password)) {
        const token = makeToken(found);
        res.status(200).json({ message: 'welcome', payload: token });
      } else {
        res.status(404).json({
          message: 'username / password is incorrect',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.get('/:id', (req, res) => {
  User.findbyid(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ err: err.message });
    });
});

router.put('/:id', auth, (req, res) => {
  // this is what i need to work on next
});

module.exports = router;
