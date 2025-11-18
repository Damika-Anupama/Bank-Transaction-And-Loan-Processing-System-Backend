const express = require("express");
const router = express.Router();
const account = require("../services/account");
const fd = require("../services/fixed_deposit");


router.get("/savingAccountsDetails/:id", async function (req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const result = await account.getSavingAccountsByUserId(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Saving accounts not found for user",
        error: "SAVING_ACCOUNTS_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting saving accounts:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve saving accounts",
      error: "SERVER_ERROR"
    });
  }
});

router.get("/user/:id", async function (req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const result = await fd.getFDsByUserId(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Fixed deposits not found for user",
        error: "FIXED_DEPOSITS_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting fixed deposits:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve fixed deposits",
      error: "SERVER_ERROR"
    });
  }
});

router.post("/", async function (req, res, next) {
  try {
    // Validate request body
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "MISSING_REQUEST_BODY"
      });
    }

    // Validate required fields
    if (!req.body.account_id) {
      return res.status(400).json({
        message: "Account ID is required",
        error: "MISSING_ACCOUNT_ID"
      });
    }

    if (!req.body.amount || req.body.amount <= 0) {
      return res.status(400).json({
        message: "Valid FD amount is required",
        error: "INVALID_FD_AMOUNT"
      });
    }

    if (!req.body.fd_period || req.body.fd_period <= 0) {
      return res.status(400).json({
        message: "Valid FD period is required",
        error: "INVALID_FD_PERIOD"
      });
    }

    req.body["fd_opening_date"] = new Date();
    const status = await fd.create(req.body);

    // Check if FD creation was successful
    if (!status) {
      return res.status(500).json({
        message: "Failed to create fixed deposit",
        error: "FD_CREATION_FAILED"
      });
    }

    res.json(status);
  } catch (err) {
    console.error(`Error while creating fixed deposit:`, err.message);
    res.status(500).json({
      message: "Failed to create fixed deposit",
      error: "SERVER_ERROR"
    });
  }
});

module.exports = router;
