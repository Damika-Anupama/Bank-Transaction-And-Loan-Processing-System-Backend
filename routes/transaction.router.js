const express = require("express");
const router = express.Router();
const account = require("../services/account");
const transfer = require("../services/transfer");


router.get("/pageDetails/:id", async function (req, res, next) {
  try {
    res.json(await account.getByUserId(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.get("/tableDetails/:id", async function (req, res, next) {
  try {
    res.json(await account.getTransactionTableData(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.post("/transfer", async function (req, res, next) {
  try {
    const status = await transfer.transferFunds(req.body);
    res.json(status);
  } catch (err) {
    console.error(`Error while the transaction`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;
