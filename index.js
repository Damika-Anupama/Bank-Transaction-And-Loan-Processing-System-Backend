require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.API_PORT;
const userRouter = require('./routes/user.router');
const accountRouter = require('./routes/account.router');
const loanRouter = require('./routes/loan.router');
const fdRouter = require('./routes/fd.router');
const branchRouter = require('./routes/branch.router');
const managerRouter = require('./routes/manager.router');
const employeeRouter = require('./routes/employee.router');
const jwt = require("jsonwebtoken");
const cors = require('cors');
const transactionRouter = require('./routes/transaction.router');

// CORS configuration for production and development
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:4200',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

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

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:4200')

  if (
    req.path === "/api/v1/user/auth"  && req.method === "POST"||
    req.path === "/api/v1/user" && req.method === "POST" 
  ) {
    next();
    return;
  }
  // let token = req.rawHeaders[1].split(" ")[1];
  let token = req.headers["authorization"].split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "No token provided" }); 
    return;
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
    if (err) {
      res.status(401).json({ message: "Unauthorized!" });
      return;
    }
    req.user_id = decoded.user_id;
    next();
  });
});

// mount all routes on /api path
app.use("/api/v1/user", userRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/fd", fdRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/loan", loanRouter);
app.use("/api/v1/manager", managerRouter);
app.use("/api/v1/employee", employeeRouter);
// when no route is matched by now, it must be a 404 <- wildcard route
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
  return;
});


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
