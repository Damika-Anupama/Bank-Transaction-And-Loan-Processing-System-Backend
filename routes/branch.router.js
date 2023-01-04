const express = require('express');
const router = express.Router();
const branches = require('../services/branch');

/* GET branch by branch id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await branches.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting branch `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET branch by manager id */
router.get('/manager/:id', async function(req, res, next) {
  try {
    res.json(await branches.getByManagerId(req.params.id));
  } catch (err) {
    console.error(`Error while branch`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET branches. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await branches.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting branches `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST branch */
router.post('/', async function(req, res, next) {
    try {
      res.json(await branches.create(req.body));
    } catch (err) {
      console.error(`Error while creating branch`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT branch */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await branches.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating branch`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE branch */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await branches.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting branch`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;