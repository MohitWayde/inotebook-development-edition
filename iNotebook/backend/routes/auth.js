const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");


const router = express.Router();
const JWT_SECRET = 'Harryisagoodb$oy';

// ROUTE 1: Create a use using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body("name", "Enter a valid name!!").isLength({ min: 3 }),
    body("email", "Enter a valid Email!!").isEmail(),
    body("password", "Password must be 5 characters long!!").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    let success = false;
    // If there are errors, Return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      // check whether the user with this email exist already

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ success, error: "Sorry!! a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      // Create a New User
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      // .then(user => res.json(user))
      // .catch(err=>{console.log(err)
      // res.json({error:"Please enter a unique value for email" , message:err.message})})

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

// // ROUTE 2:  Authenticate a user using: POST "/api/auth/login". No login required
router.post(
  "/login",
  [body("email", "Enter a valid Email!!").isEmail()],
  [body("password", "Password cannot be blank!").exists()],
  async (req, res) => {
    let success = false;
    // If there are errors, Return bad request & the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct Credentials" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Please try to login with correct Credentials" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Error Occured");
    }
  }
);

// ROUTE 3: Get logged in user details using: POST "/api/auth/createuser". Login required

router.post('/getuser', fetchuser, async(req, res)=>{
try {
  userId = req.user.id;
  const user = await User.findById(userId).select("-password");
  res.send(user);
} 
catch (error) {
  console.error(error.message);
  res.status(500).send("Internal Error Occured");
}
})

module.exports = router;
