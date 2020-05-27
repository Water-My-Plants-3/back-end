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
  Plants.add(req.body)
    .then((plant) => {
      res.status(201).json({ created: plant });
    })
    .catch((err) => {
      res.status(500).json({ message: 'error' });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Plants.findbyid(id)
    .then((plant) => {
      plant
        ? Plants.update(id, changes).then((updated) => {
            res.status(200).json({
              message: `successfully updated plant ID: ${id}`,
            });
          })
        : res.status(404).json({
            errorMessage: 'plant not found',
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Plants.remove({ id })
    .then((deleted) => {
      res
        .status(200)
        .json({ message: `plant ID: ${id} has been removed`, deleted });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: `cannot remove plant by ID: ${id}` });
    });
});

module.exports = router;
