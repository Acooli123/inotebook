const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
//const { body, validationResult } = require('express-validator'); // For validation of request body
//const { check, validationResult } = require('express-validator');

const JWT_SECRET = 'mynameisacooli';

// ROUTE 1: Create a User using: POST "/api/auth/createuser". No login required
// @route   POST /api/users
// @desc    Register new user
// @access  Public
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Simple validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    user = new User({
      name,
      email,
      password: hashedPassword
    });

    const data = {
      user: {
        id: user.id
      }
    };

    await user.save();

    const authToken = jwt.sign(data,JWT_SECRET);

    res.status(201).json({ authToken });
    //res.status(201).json({ user });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// ROUTE 2: Authenticate a User using: POST "/api/auth/login". No login required
// @route   POST /api/users/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please enter all fields' });
    }

    // Check for existing user
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist. Please try to login with correct credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const data = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(data,JWT_SECRET);

    res.json({ authToken });

  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE 3: Get loggedin user details using: POST "/api/auth/getuser". Login required
// @route   POST /api/users/getuser
// @desc    Get user data
// @access  Private
router.post('/getuser', fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// Middleware to authenticate token


module.exports = router;