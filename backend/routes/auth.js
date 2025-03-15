const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post(
    '/',
    [
        body('username', 'Enter a valid username with at least 3 characters').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Enter a valid password with at least 6 characters').isLength({ min: 6 })
    ],
    (req, res) => {
        console.log("Received Request Body:", req.body); // Debugging Log

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log("Validation Errors:", errors.array()); // Debugging Log
            return res.status(400).json({ errors: errors.array() });
        }

        res.json({ message: 'User validation successful', data: req.body });
    }
);

module.exports = router;
