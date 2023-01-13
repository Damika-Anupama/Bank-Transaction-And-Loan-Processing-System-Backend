const express = require('express');
const router = express.Router();
const loan_basic_detail = require('../services/loan_basic_detail');
const online_loan = require('../services/online_portal_loan');

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

router.get('/unapproved-loans', async function(req, res, next) {
  try {
    res.json(await loan_basic_detail.getUnapprovedLoans());
  } catch (err) {
    console.error(`Error while getting branch `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.post('/online', async function(req, res, next) {
  try {
    req.body['starting_date'] = new Date();
    req.body['is_approved'] = 1;
    const result = await loan_basic_detail.create(req.body);
    if (result.message == "loan_basic_detail created successfully!") {
      const body = {
        loan_detail_id: result.loan_basic_detail_id,
        fixed_deposit_id: req.body['fixed_deposit_id']
      }
      const result1 = await online_loan.create(body);
      res.json(result1);
    }
  } catch (err) {
    console.error(`Error while creating loan`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
module.exports = router;