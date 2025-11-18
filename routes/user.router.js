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
    // Validate request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Email and password are required",
        error: "MISSING_CREDENTIALS"
      });
    }

    const user = await users.getByEmail(req.body.email);

    if (!user || !user.data || user.data.length === 0) {
      return res.status(404).json({
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }

    // Use promisified bcrypt compare
    bcrypt.compare(req.body.password, user.data[0].password, (err, result) => {
      if (err) {
        console.error('Bcrypt comparison error:', err);
        return res.status(500).json({
          message: "Error during password verification",
          error: "PASSWORD_VERIFICATION_ERROR"
        });
      }

      if (result) {
        const type = user.data[0].type;
        const token = createJWT(user.data[0]);
        res.json({token, type});
      } else {
        res.status(401).json({
          message: "Password is incorrect",
          error: "INVALID_PASSWORD"
        });
      }
    });
  } catch (err) {
    console.error(`Error while authenticating user:`, err.message);
    res.status(500).json({
      message: "Internal server error during authentication",
      error: "AUTH_ERROR"
    });
    next(err);
  }
});
/* GET user by id */
router.get("/:id", async function (req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }
    const result = await users.getById(req.params.id);
    if (!result || !result.data || result.data.length === 0) {
      return res.status(404).json({
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }
    res.json(result);
  } catch (err) {
    console.error(`Error while getting user:`, err.message);
    res.status(500).json({
      message: "Error retrieving user",
      error: "USER_RETRIEVAL_ERROR"
    });
    next(err);
  }
});

/* GET user by name */
router.get("/name/:name", async function (req, res, next) {
  try {
    if (!req.params.name) {
      return res.status(400).json({
        message: "User name is required",
        error: "MISSING_USER_NAME"
      });
    }
    res.json(await users.getByName(req.params.name));
  } catch (err) {
    console.error(`Error while getting user by name:`, err.message);
    res.status(500).json({
      message: "Error retrieving user by name",
      error: "USER_NAME_RETRIEVAL_ERROR"
    });
    next(err);
  }
});

/* GET user by email */
router.get("/email/:email", async function (req, res, next) {
  try {
    if (!req.params.email) {
      return res.status(400).json({
        message: "User email is required",
        error: "MISSING_USER_EMAIL"
      });
    }
    res.json(await users.getByEmail(req.params.email));
  } catch (err) {
    console.error(`Error while getting user by email:`, err.message);
    res.status(500).json({
      message: "Error retrieving user by email",
      error: "USER_EMAIL_RETRIEVAL_ERROR"
    });
    next(err);
  }
});

/* GET users. */
router.get("/", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting users:`, err.message);
    res.status(500).json({
      message: "Error retrieving users",
      error: "USERS_RETRIEVAL_ERROR"
    });
    next(err);
  }
});

/* GET user dashboard details */
router.get("/dashboard/:email", async function (req, res, next) {
  try {
    if (!req.params.email) {
      return res.status(400).json({
        message: "Email is required",
        error: "MISSING_EMAIL"
      });
    }
    const userData = await users.getDashboardDetails(req.params.email);
    res.json(userData);
  } catch (err) {
    console.error(`Error while getting user dashboard details:`, err.message);
    res.status(500).json({
      message: "Error retrieving user dashboard details",
      error: "DASHBOARD_RETRIEVAL_ERROR"
    });
    next(err);
  }
});

/* POST user */
router.post("/", async function (req, res, next) {
  try {
    // Validate required fields
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: "Email and password are required",
        error: "MISSING_REQUIRED_FIELDS"
      });
    }

    const status = await users.create(req.body);
    const createdUser = await users.getByEmail(req.body.email);

    if (!createdUser || !createdUser.data || createdUser.data.length === 0) {
      return res.status(500).json({
        message: "User created but could not be retrieved",
        error: "USER_RETRIEVAL_AFTER_CREATE_ERROR"
      });
    }

    const jwt = createJWT(createdUser.data[0]);
    res.json({ status, jwt });
  } catch (err) {
    console.error(`Error while creating user:`, err.message);
    res.status(500).json({
      message: "Error creating user",
      error: "USER_CREATION_ERROR"
    });
    next(err);
  }
});

/* PUT user */
router.put("/:id", async function (req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Update data is required",
        error: "MISSING_UPDATE_DATA"
      });
    }
    res.json(await users.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating user:`, err.message);
    res.status(500).json({
      message: "Error updating user",
      error: "USER_UPDATE_ERROR"
    });
    next(err);
  }
});

/* DELETE user */
router.delete("/:id", async function (req, res, next) {
  try {
    if (!req.params.id) {
      return res.status(400).json({
        message: "User ID is required",
        error: "MISSING_USER_ID"
      });
    }
    res.json(await users.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting user:`, err.message);
    res.status(500).json({
      message: "Error deleting user",
      error: "USER_DELETION_ERROR"
    });
    next(err);
  }
});

module.exports = router;
