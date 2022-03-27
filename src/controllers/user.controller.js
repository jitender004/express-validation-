const express = require("express");
const { body, validationResult } = require("express-validator");
const res = require("express/lib/response");
const User = require("../models/user.model");
const router = express.Router();

// first_name => required
// last_name => required
// email => required and should be a valid email
// pincode => required and should be exactly 6 numbers
// age => required and should be between 1 and 100.
// gender => required and should be either Male, Female or Others

router.post(
  "",
  body("id").isNumeric().notEmpty(),
  body("first_name").isString().notEmpty().isLength({ min: 5, max: 50 }),
  body("last_name").isString().notEmpty(),
  body("email")
    .isEmail()
    .bail()
    .custom(async (value) => {
      const email = await User.findOne({ email: value }).lean().exec();
      if (email) {
        return res.send("Email already exists");
      }
    }),
  body("pincode").isNumeric().isLength({ min: 6, max: 6 }).notEmpty(),
  body("age").isFloat({ min: 1, max: 100 }),
  body("gender").isIn(["Male", "Female", "Others"]),
  async (req, res) => {
    try {
      console.log(body("id"));
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ error: errors.array() });
      }
      const user = await User.create(req.body);
      return res.status(201).send(user);
    } catch (er) {
      return res.status(500).send(er.message);
    }
  }
);
router.get("", async (req, res) => {
  try {
    const user = await User.find().lean().exec();
    return res.send(user);
  } catch (er) {
    return res.status(500).send(er.message);
  }
});
module.exports = router;
