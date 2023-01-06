const express = require('express');
const router = express.Router();
const manager = require('../services/manager');
const jwt = require('jsonwebtoken');

/* GET manager by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await manager.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting manager `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* GET managers. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await manager.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting manager `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST manager */
router.post('/', async function(req, res, next) {
    try {
      res.json(await manager.create(req.body));
    } catch (err) {
      console.error(`Error while creating manager`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT manager */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await manager.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating manager`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE manager */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await manager.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting manager`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;