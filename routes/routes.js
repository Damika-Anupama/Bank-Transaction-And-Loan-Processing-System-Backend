const express = require('express');
const router = express.Router();
const programmingLanguages = require('../services/services');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programmingLanguages.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    next(err);
  }
});

router.post('/', async function(req, res, next) {
    try {
      res.json(await programmingLanguages.create(req.body));
    } catch (err) {
      console.error(`Error while creating user`, err.message);
      next(err);
    }
  });
module.exports = router;