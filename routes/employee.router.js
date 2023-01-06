const express = require('express');
const router = express.Router();
const employee = require('../services/employee');
const jwt = require('jsonwebtoken');

/* GET employee by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await employee.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* GET employees. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await employee.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting employee `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST employee */
router.post('/', async function(req, res, next) {
    try {
      res.json(await employee.create(req.body));
    } catch (err) {
      console.error(`Error while creating employee`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT employee */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await employee.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating employee`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE employee */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await employee.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting employee`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;