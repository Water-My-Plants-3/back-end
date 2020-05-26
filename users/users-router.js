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

router.get('/', (req, res) => {
  console.log('token', req.decodedToken);
  Users.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => res.send(err));
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

// router.put('/:id', auth, (req, res) => {
//   const { username, password } = req.body;

//   User.findbyid(id)
//     .then((found) => {
//       if (found && bcrypt.compareSync(password, found.password))
//         ? User.update(id, changes).then((updateUser) => {
//             res.status(200).json({
//               message: `successfully updated user ID: ${id}`,
//               updateUser,
//             });
//           })
//         : res.status(404).json({ message: 'no user found' });
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({ message: err.message });
//     });
// });

module.exports = router;
