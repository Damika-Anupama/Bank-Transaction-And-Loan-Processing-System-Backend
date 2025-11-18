const express = require("express");
const router = express.Router();
const account = require("../services/account");
const transfer = require("../services/transfer");


router.get("/pageDetails/:id", async function (req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const result = await account.getByUserId(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting user:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve user details",
      error: "SERVER_ERROR"
    });
  }
});

router.get("/tableDetails/:id", async function (req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }

    const result = await account.getTransactionTableData(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Transaction data not found for user",
        error: "TRANSACTION_DATA_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting transaction table data:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve transaction data",
      error: "SERVER_ERROR"
    });
  }
});

router.post("/transfer", async function (req, res, next) {
  try {
    // Validate required fields in request body
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "MISSING_REQUEST_BODY"
      });
    }

    const { from_account, to_account, amount } = req.body;

    if (!from_account) {
      return res.status(400).json({
        message: "From account is required",
        error: "MISSING_FROM_ACCOUNT"
      });
    }

    if (!to_account) {
      return res.status(400).json({
        message: "To account is required",
        error: "MISSING_TO_ACCOUNT"
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Valid amount is required",
        error: "INVALID_AMOUNT"
      });
    }

    const status = await transfer.transferFunds(req.body);

    // Check if transfer was successful
    if (!status) {
      return res.status(500).json({
        message: "Transfer failed",
        error: "TRANSFER_FAILED"
      });
    }

    res.json(status);
  } catch (err) {
    console.error(`Error while processing transaction:`, err.message);
    res.status(500).json({
      message: "Failed to process transfer",
      error: "SERVER_ERROR"
    });
  }
});

module.exports = router;
