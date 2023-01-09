const express = require("express");
const router = express.Router();
const account = require("../services/account");
const fd = require("../services/fixed_deposit");


router.get("/savingAccountsDetails/:id", async function (req, res, next) {
  try {
    res.json(await account.getSavingAccountsByUserId(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
router.get("/user/:id", async function (req, res, next) {
  try {
    res.json(await fd.getFDsByUserId(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    req.body["fd_opening_date"] = new Date();
    const status = await fd.create(req.body)
    res.json(status);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;
