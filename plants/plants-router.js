const router = require('express').Router();
const Plants = require('./plants-model');

router.get('/user/:id', (req, res) => {
  Plants.findbyuser(req.params.id)
    .then((plants) => {
      res.status(200).json(plants);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/', (req, res) => {
  //   const { id } = req.params;
  //   const newPlant = req.body;
  Plants.add(req.params.body.newPlant, req.params.id)
    .then((plant) => {
      res.status(201).json({ created: plant });
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

module.exports = router;
