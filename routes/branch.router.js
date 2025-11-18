const express = require('express');
const router = express.Router();
const branches = require('../services/branch');

/* GET branch by branch id */
router.get('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const result = await branches.getById(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Branch not found",
        error: "BRANCH_NOT_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting branch:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve branch",
      error: "SERVER_ERROR"
    });
  }
});

/* GET branch by manager id */
router.get('/manager/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Manager ID is required",
        error: "MISSING_MANAGER_ID"
      });
    }

    const result = await branches.getByManagerId(req.params.id);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "Branch not found for manager",
        error: "BRANCH_NOT_FOUND_FOR_MANAGER"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting branch by manager ID:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve branch for manager",
      error: "SERVER_ERROR"
    });
  }
});

/* GET branches. */
router.get('/', async function(req, res, next) {
  try {
    const result = await branches.getMultiple(req.query.page);

    // Check if result is null or undefined
    if (!result) {
      return res.status(404).json({
        message: "No branches found",
        error: "NO_BRANCHES_FOUND"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while getting branches:`, err.message);
    res.status(500).json({
      message: "Failed to retrieve branches",
      error: "SERVER_ERROR"
    });
  }
});

/* POST branch */
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
    if (!req.body.branch_name) {
      return res.status(400).json({
        message: "Branch name is required",
        error: "MISSING_BRANCH_NAME"
      });
    }

    if (!req.body.branch_address) {
      return res.status(400).json({
        message: "Branch address is required",
        error: "MISSING_BRANCH_ADDRESS"
      });
    }

    const result = await branches.create(req.body);

    // Check if branch creation was successful
    if (!result) {
      return res.status(500).json({
        message: "Failed to create branch",
        error: "BRANCH_CREATION_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while creating branch:`, err.message);
    res.status(500).json({
      message: "Failed to create branch",
      error: "SERVER_ERROR"
    });
  }
});

/* PUT branch */
router.put('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    // Validate request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Request body with update data is required",
        error: "MISSING_UPDATE_DATA"
      });
    }

    const result = await branches.update(req.params.id, req.body);

    // Check if update was successful
    if (!result) {
      return res.status(404).json({
        message: "Branch not found or update failed",
        error: "BRANCH_UPDATE_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while updating branch:`, err.message);
    res.status(500).json({
      message: "Failed to update branch",
      error: "SERVER_ERROR"
    });
  }
});

/* DELETE branch */
router.delete('/:id', async function(req, res, next) {
  try {
    // Validate id parameter
    if (!req.params.id) {
      return res.status(400).json({
        message: "Branch ID is required",
        error: "MISSING_BRANCH_ID"
      });
    }

    const result = await branches.remove(req.params.id);

    // Check if deletion was successful
    if (!result) {
      return res.status(404).json({
        message: "Branch not found or deletion failed",
        error: "BRANCH_DELETION_FAILED"
      });
    }

    res.json(result);
  } catch (err) {
    console.error(`Error while deleting branch:`, err.message);
    res.status(500).json({
      message: "Failed to delete branch",
      error: "SERVER_ERROR"
    });
  }
});

module.exports = router;