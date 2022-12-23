const services = require("../services/services");

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
    services.getByName(req.body.username).then(user => {
        if (user) {
        res.status(400).send({
            message: "Failed! Username is already in use!"
        });
        return;
        }

    // Email
    services.getByEmail(req.body.email).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;