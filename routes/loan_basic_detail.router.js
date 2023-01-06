const express = require('express');
const router = express.Router();
const details = require('../services/loan_basic_detail');
const jwt = require('jsonwebtoken');

/* GET Loan Details by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await details.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting Loan Details `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET Loan details by customer id */
router.get('/customer_id/:customer_id', async function(req, res, next) {
    try {
      res.json(await details.getBy(req.params.customer_id));
    } catch (err) {
      console.error(`Error while getting Loan Details' customer_id`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* GET Loan Details. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await details.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting Loan Details `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST Loan Details */
router.post('/', async function(req, res, next) {
    try {
      res.json(await details.create(req.body));
    } catch (err) {
      console.error(`Error while creating Loan Details`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT Loan Details */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await details.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating Loan Details`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE Loan Details */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await details.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting Loan Details`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;