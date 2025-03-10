const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "Jyotiislearning@jwt";

// Creating a user using : POST "/api/auth/createUser". No Login required
router.post(
  "/createUser",
  [
    // Adding validations for the fields using express-validator
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // If there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // Check whether the user with this email exists already
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ error: "Sorry a user with this email already exists" });
      }

      //   Hashing the password using bcryptjs
      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);
      // Create a new user
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      //   Using JWT to create a authentication token using a secret
      const authtoken = jwt.sign(data, JWT_SECRET);
      console.log(authtoken);

      //   res.json(user);
      res.json({ authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interal Server Error");
    }
  }
);

// Authenticating a user using : POST "/api/auth/login". No Login required
router.post(
  "/login",
  [
    // Adding validations for the fields using express-validator
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password caanot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors return Bad Request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json("Please try to login with correct credentials");
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json("Please try to login with correct credentials");
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      res.json({ authtoken: authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Interal Server Error");
    }
  }
);

module.exports = router;
