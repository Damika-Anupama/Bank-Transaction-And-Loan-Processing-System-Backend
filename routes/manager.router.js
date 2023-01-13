const express = require('express');
const router = express.Router();
const users = require('../services/manager');
const transfer = require('../services/transfer');

/* GET user by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await users.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET user by name */
router.get('/name/:name', async function(req, res, next) {
  try {
    res.json(await users.getByName(req.params.name));
  } catch (err) {
    console.error(`Error while getting user' name`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET user by email */
router.get('/email/:email', async function(req, res, next) {
  try {
    res.json(await users.getByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.get('/dashboard-blocks/:email', async function(req, res, next) {
  try {
    res.json(await users.getManagerDashboardDetailsByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting manager's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

router.get('/total-transactions/:branch_id', async function(req, res, next) {
  try {
    res.json(await transfer.getTotalTransactions(req.params.branch_id));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
router.get('/total-withdrawals/:branch_id', async function(req, res, next) {
  try {
    res.json(await transfer.getTotalWithdrawals(req.params.branch_id));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
router.get('/late-loans/:branch_id', async function(req, res, next) {
  try {
    res.json(await transfer.getLateLoans());
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST user */
router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      // send error response if there was a problem
      res.status(500).json({ message: error.message });
      next(err);
    }
  });

/* PUT user */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

module.exports = router;