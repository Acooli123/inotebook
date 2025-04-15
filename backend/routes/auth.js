const express = require('express');
const User = require('../models/User');
const router = express.Router();

//create a User using: POST "/api/auth/createuser". No login required
router.get('/', (req, res) => {
    console.log(req.body);
    const user = User(req.body);
    user.save();
    res.send(req.body);
})

module.exports = router;