const express = require('express');
const router = express.Router();
const users = require('../services/services');

/* GET user by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await users.getById(req.params.id));
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    next(err);
  }
});
/* GET user by name */
router.get('/name/:name', async function(req, res, next) {
  try {
    res.json(await users.getByName(req.params.name));
  } catch (err) {
    console.error(`Error while getting user' name`, err.message);
    next(err);
  }
});
/* GET user by email */
router.get('/email/:email', async function(req, res, next) {
  try {
    res.json(await users.getByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    next(err);
  }
});
/* GET users. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});
/* POST user */
router.post('/', async function(req, res, next) {
    try {
      res.json(await users.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });

/* PUT user */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    next(err);
  }
});

/* DELETE user */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user`, err.message);
    next(err);
  }
});

module.exports = router;