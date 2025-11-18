const express = require('express');
const router = express.Router();
const loan_basic_detail = require('../services/loan_basic_detail');
const online_loan = require('../services/online_portal_loan');

router.get('/user/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const result = await loan_basic_detail.getByUserId(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Loans not found for user",
        error: "LOANS_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting loans for user:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve user loans",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/unapproved-loans', async function(req, res, next) {
  try {
    const result = await loan_basic_detail.getUnapprovedLoans();

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "No unapproved loans found",
        error: "NO_UNAPPROVED_LOANS"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting unapproved loans:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve unapproved loans",
      error: "SERVER_ERROR"
    });
  }
});

router.post('/online', async function(req, res, next) {
  try {
    // Validate request body
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "MISSING_REQUEST_BODY"
      });
    }

    // Validate required fields
    if (!req.body.fixed_deposit_id) {
      return res.status(400).json({
        message: "Fixed deposit ID is required",
        error: "MISSING_FIXED_DEPOSIT_ID"
      });
    }

    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).json({
        message: "Valid loan amount is required",
        error: "INVALID_LOAN_AMOUNT"
      });
    }

    req.body['starting_date'] = new Date();
    req.body['is_approved'] = 1;

    const result = await loan_basic_detail.create(req.body);

    // Check if loan creation was successful
    if (!result) {
      return res.status(500).json({
        message: "Failed to create loan",
        error: "LOAN_CREATION_FAILED"
      });
    }

    if (result.message == "loan_basic_detail created successfully!") {
      // Validate loan_basic_detail_id exists
      if (!result.loan_basic_detail_id) {
        return res.status(500).json({
          message: "Loan created but ID not returned",
          error: "INVALID_LOAN_RESPONSE"
        });
      }

      const body = {
        loan_detail_id: result.loan_basic_detail_id,
        fixed_deposit_id: req.body['fixed_deposit_id']
      }

      const result1 = await online_loan.create(body);

      // Check if online loan creation was successful
      if (!result1) {
        return res.status(500).json({
          message: "Loan created but online loan record failed",
          error: "ONLINE_LOAN_CREATION_FAILED"
        });
      }

      res.json(result1);
    } else {
      return res.status(500).json({
        message: result.message || "Failed to create loan",
        error: "LOAN_CREATION_FAILED"
      });
    }
  } catch (err) {
    console.error(`Error while creating online loan:`, err.message);
    res.status(500).json({
      message: "Failed to process online loan application",
      error: "SERVER_ERROR"
    });
  }
});
module.exports = router;