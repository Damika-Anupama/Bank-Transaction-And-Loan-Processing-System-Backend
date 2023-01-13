const express = require("express");
const router = express.Router();
const employee = require("../services/employee");
const user = require("../services/users");

router.post("/", async function (req, res, next) {
  try {
    const status1 = await user.create(req.body)
    console.log(status1)
    req.body['user_id'] = status1.userId;
    const status2 = await employee.create(req.body)
    res.json(status2);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.get('/home', async function(req, res, next) {
    try {
      res.json(await user.getCustomerDetails());
    } catch (err) {
      console.error(`Error while getting branch `, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

module.exports = router;
