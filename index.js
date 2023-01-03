require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.API_PORT;
const userRouter = require('./routes/user.router');
const accountRouter = require('./routes/account.router');
const fdRouter = require('./routes/fd.router');
const branchRouter = require('./routes/branch.router');

// parse incoming requests as JSON
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/account", accountRouter);
app.use("/api/v1/fd", fdRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Bank app listening at http://localhost:${port}`);
});
