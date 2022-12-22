const express = require("express");
const app = express();
const port = 3000;
const routes = require("./routes/routes");
const jwt = require('jsonwebtoken');

console.log(process.env.UV_THREADPOOL_SIZE);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.use("/user", routes);
/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// /* using JWT web token */
// /* Generate a JWT when a user logs in to your application */
// app.post('/login', (req, res) => {
//   // Verify the user's credentials
//   // Generate a JWT if the credentials are valid
//   const token = jwt.sign({ userId: user.id }, 'secretkey');
//   res.send({ token });
// });

// /* Protect routes that require authentication by verifying the JWT */
// app.get('/protected', verifyToken, (req, res) => {
//   // The request will have an additional `user` property with the
//   // user's information if the JWT is valid
//   res.send(req.user);
// });

// function verifyToken(req, res, next) {
//   // Get the token from the request header
//   const token = req.headers['x-access-token'];
//   if (!token) return res.status(401).send({ auth: false, message: 'No token provided' });

//   // Verify the token
//   jwt.verify(token, 'secretkey', (err, decoded) => {
//     if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token' });
//     req.user = decoded;
//     next();
//   });
// }
