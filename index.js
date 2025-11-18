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

  // Allow unauthenticated access to auth and registration endpoints
  if (
    (req.path === "/api/v1/user/auth" && req.method === "POST") ||
    (req.path === "/api/v1/user" && req.method === "POST")
  ) {
    next();
    return;
  }

  try {
    // Check if authorization header exists
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(401).json({
        message: "No authorization header provided",
        error: "MISSING_AUTH_HEADER"
      });
      return;
    }

    // Extract token from header
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      res.status(401).json({
        message: "Invalid authorization header format. Expected: Bearer <token>",
        error: "INVALID_AUTH_FORMAT"
      });
      return;
    }

    const token = tokenParts[1];
    if (!token) {
      res.status(401).json({
        message: "No token provided",
        error: "MISSING_TOKEN"
      });
      return;
    }

    // Verify JWT token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err.message);
        res.status(401).json({
          message: "Invalid or expired token",
          error: "TOKEN_VERIFICATION_FAILED"
        });
        return;
      }
      req.user_id = decoded.user_id;
      next();
    });
  } catch (err) {
    console.error("Authentication middleware error:", err);
    res.status(500).json({
      message: "Internal server error during authentication",
      error: "AUTH_MIDDLEWARE_ERROR"
    });
  }
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

  // Log error details for debugging
  console.error('Error occurred:', {
    message: err.message,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  // Send appropriate error response
  const errorResponse = {
    message: err.message || 'Internal server error',
    error: err.error || 'INTERNAL_ERROR',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  };

  res.status(statusCode).json(errorResponse);
  return;
});
app.listen(port, () => {
  console.log(`Bank app listening at http://localhost:${port}`);
});
