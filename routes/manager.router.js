const express = require('express');
const router = express.Router();
const users = require('../services/manager');
const transfer = require('../services/transfer');

/* GET user by id */
router.get('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Manager ID is required",
        error: "MISSING_MANAGER_ID"
      });
    }

    const result = await users.getById(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Manager not found",
        error: "MANAGER_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting manager:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve manager",
      error: "SERVER_ERROR"
    });
  }
});

/* GET user by name */
router.get('/name/:name', async function(req, res, next) {
  try {
    // Validate name parameter
    if (!req.params.name) {
      return res.status(400).json({
        message: "Manager name is required",
        error: "MISSING_MANAGER_NAME"
      });
    }

    const result = await users.getByName(req.params.name);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Manager not found",
        error: "MANAGER_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting manager by name:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve manager by name",
      error: "SERVER_ERROR"
    });
  }
});

/* GET user by email */
router.get('/email/:email', async function(req, res, next) {
  try {
    // Validate email parameter
    if (!req.params.email) {
      return res.status(400).json({
        message: "Manager email is required",
        error: "MISSING_MANAGER_EMAIL"
      });
    }

    const result = await users.getByEmail(req.params.email);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Manager not found",
        error: "MANAGER_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting manager by email:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve manager by email",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/dashboard-blocks/:email', async function(req, res, next) {
  try {
    // Validate email parameter
    if (!req.params.email) {
      return res.status(400).json({
        message: "Manager email is required",
        error: "MISSING_MANAGER_EMAIL"
      });
    }

    const result = await users.getManagerDashboardDetailsByEmail(req.params.email);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Dashboard details not found for manager",
        error: "DASHBOARD_DETAILS_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting manager dashboard details:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve manager dashboard details",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/total-transactions/:branch_id', async function(req, res, next) {
  try {
    // Validate branch_id parameter
    if (!req.params.branch_id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const result = await transfer.getTotalTransactions(req.params.branch_id);

    // Check if result is null or undefined
    if (result === null || result === undefined) {
      return res.status(404).json({
        message: "Transaction data not found for branch",
        error: "TRANSACTION_DATA_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting total transactions:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve total transactions",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/total-withdrawals/:branch_id', async function(req, res, next) {
  try {
    // Validate branch_id parameter
    if (!req.params.branch_id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const result = await transfer.getTotalWithdrawals(req.params.branch_id);

    // Check if result is null or undefined
    if (result === null || result === undefined) {
      return res.status(404).json({
        message: "Withdrawal data not found for branch",
        error: "WITHDRAWAL_DATA_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting total withdrawals:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve total withdrawals",
      error: "SERVER_ERROR"
    });
  }
});

router.get('/late-loans/:branch_id', async function(req, res, next) {
  try {
    // Validate branch_id parameter
    if (!req.params.branch_id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const result = await transfer.getLateLoans();

    // Check if result is null or undefined
    if (result === null || result === undefined) {
      return res.status(404).json({
        message: "Late loan data not found",
        error: "LATE_LOAN_DATA_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting late loans:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve late loans",
      error: "SERVER_ERROR"
    });
  }
});

/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    const result = await users.getMultiple(req.query.page);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "No managers found",
        error: "NO_MANAGERS_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting managers:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve managers",
      error: "SERVER_ERROR"
    });
  }
});

/* POST user */
router.post('/', async function(req, res, next) {
  try {
    // Validate request body
    if (!req.body) {
      return res.status(400).json({
        message: "Request body is required",
        error: "MISSING_REQUEST_BODY"
      });
    }

    // Validate required fields
    if (!req.body.name) {
      return res.status(400).json({
        message: "Manager name is required",
        error: "MISSING_MANAGER_NAME"
      });
    }

    if (!req.body.email) {
      return res.status(400).json({
        message: "Manager email is required",
        error: "MISSING_MANAGER_EMAIL"
      });
    }

    const result = await users.create(req.body);

    // Check if manager creation was successful
    if (!result) {
      return res.status(500).json({
        message: "Failed to create manager",
        error: "MANAGER_CREATION_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while creating manager:`, err.message);
    res.status(500).json({
      message: "Failed to create manager",
      error: "SERVER_ERROR"
    });
  }
});

/* PUT user */
router.put('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Manager ID is required",
        error: "MISSING_MANAGER_ID"
      });
    }

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body with update data is required",
        error: "MISSING_UPDATE_DATA"
      });
    }

    const result = await users.update(req.params.id, req.body);

    // Check if update was successful
    if (!result) {
      return res.status(404).json({
        message: "Manager not found or update failed",
        error: "MANAGER_UPDATE_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while updating manager:`, err.message);
    res.status(500).json({
      message: "Failed to update manager",
      error: "SERVER_ERROR"
    });
  }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Manager ID is required",
        error: "MISSING_MANAGER_ID"
      });
    }

    const result = await users.remove(req.params.id);

    // Check if deletion was successful
    if (!result) {
      return res.status(404).json({
        message: "Manager not found or deletion failed",
        error: "MANAGER_DELETION_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while deleting manager:`, err.message);
    res.status(500).json({
      message: "Failed to delete manager",
      error: "SERVER_ERROR"
    });
  }
});

module.exports = router;