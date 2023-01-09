const express = require('express');
const router = express.Router();
const loan_basic_detail = require('../services/loan_basic_detail');

router.get('/user/:id', async function(req, res, next) {
  try {
    res.json(await loan_basic_detail.getByUserId(req.params.id));
  } catch (err) {
    console.error(`Error while getting branch `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
module.exports = router;