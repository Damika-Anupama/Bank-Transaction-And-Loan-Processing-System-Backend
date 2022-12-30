const express = require('express');
const router = express.Router();
const userRouter = require('./user.router');
const accountsRouter = require('./account.router');
const fdRouter = require('./fd.router');

router.use('/user', userRouter);
router.use('/accounts', accountsRouter);
router.use('/fd', fdRouter);

module.exports = router;