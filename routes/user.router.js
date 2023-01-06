const express = require("express");
const router = express.Router();
const users = require("../services/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function createJWT(user) {
  return jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
    expiresIn: "2h",
  });
}

/* When user's logging to the system */
router.post("/auth", async function (req, res, next) {
  try {
    const user = await users.getByEmail(req.body.email);
    if (user) {
      bcrypt.compare(req.body.password, user.data[0].password, (err, result) => {
        if (result) {
          const token = createJWT(user);
          res.json(token);
        } else {
          res.status(401).json({ message: "Password is incorrect" });
        }
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(`Error while getting user `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET user by id */
router.get("/:id", async function (req, res, next) {
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
router.get("/name/:name", async function (req, res, next) {
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
router.get("/email/:email", async function (req, res, next) {
  try {
    res.json(await users.getByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting user's email`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* GET users. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users `, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* GET user dashboard details */
router.get("/dashboard/:email", async function (req, res, next) {
  try {
    const userData = await users.getDashboardDetails(req.params.email);
    res.json(userData);
  } catch (err) {
    console.error(`Error while getting user's dashboard details`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});
/* POST user */
router.post("/", async function (req, res, next) {
  try {
    const status = await users.create(req.body)
    const jwt = createJWT(await users.getByEmail(req.body.email));
    // send both status and jwt token as response
    res.json({ status, jwt });
  } catch (err) {
    console.error(`Error while creating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* PUT user */
router.put("/:id", async function (req, res, next) {
  try {
    res.json(await users.update(req.params.id, req.body));
    // if (req.body.role === 'MANAGER') {
    //   res.redirect('/managers');
    // } else if (req.body.role === 'employee') {
    //   res.redirect('/employees');
    // }
  } catch (err) {
    console.error(`Error while updating user`, err.message);
    // send error response if there was a problem
    res.status(500).json({ message: error.message });
    next(err);
  }
});

/* DELETE user */
router.delete("/:id", async function (req, res, next) {
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
