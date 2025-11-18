const express = require("express");
const router = express.Router();
const employee = require("../services/employee");
const user = require("../services/users");

router.post("/", async function (req, res, next) {
  try {
    // Validate request body
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "MISSING_REQUEST_BODY"
      });
    }

    // Validate required user fields
    if (!req.body.email) {
      return res.status(400).json({
        message: "Email is required",
        error: "MISSING_EMAIL"
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        message: "Password is required",
        error: "MISSING_PASSWORD"
      });
    }

    if (!req.body.first_name) {
      return res.status(400).json({
        message: "First name is required",
        error: "MISSING_FIRST_NAME"
      });
    }

    if (!req.body.last_name) {
      return res.status(400).json({
        message: "Last name is required",
        error: "MISSING_LAST_NAME"
      });
    }

    // Validate required employee fields
    if (!req.body.branch_id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const status1 = await user.create(req.body);
    console.log(status1);

    // Check if user creation was successful
    if (!status1 || !status1.userId) {
      return res.status(500).json({
        message: "Failed to create user account",
        error: "USER_CREATION_FAILED"
      });
    }

    req.body['user_id'] = status1.userId;
    const status2 = await employee.create(req.body);

    // Check if employee creation was successful
    if (!status2) {
      return res.status(500).json({
        message: "User created but employee record failed",
        error: "EMPLOYEE_CREATION_FAILED"
      });
    }

    res.json(status2);
  } catch (err) {
    console.error(`Error while creating employee:`, err.message);
    res.status(500).json({
      message: "Failed to create employee",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/home', async function(req, res, next) {
  try {
    const result = await user.getCustomerDetails();

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Customer details not found",
        error: "CUSTOMER_DETAILS_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting customer details:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve customer details",
      error: "SERVER_ERROR"
    });
  }
});

module.exports = router;
