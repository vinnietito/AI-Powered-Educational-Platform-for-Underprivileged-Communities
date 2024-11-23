const express = require('express');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

//User Registration
router.post('/register', (req, res) => {
    const { first_name, last_name, email, password, country, cohort } = req.body;

    // Check if any fields are missing
    if (!first_name || !last_name || !email || !password || !country || !cohort) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Error hashing password' });
        }

        // Prepare the query
        const query = 'INSERT INTO users (first_name, last_name, email, password_hash, country, cohort) VALUES (?, ?, ?, ?, ?, ?)';

        // Execute the query
        db.query(query, [first_name, last_name, email, hashedPassword, country, cohort], (err, result) => {
            if (err) {
                console.error('Error inserting user into database:', err); // Log the error for debugging
                return res.status(500).json({ error: 'Error registering user', details: err.message }); // Provide the error details
            }

            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});


//User Login
router.post('/login', (req, res) => {
    const {email, password} = req.body;

    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err || results.length === 0) return res.status(400).send('Invalid credentials');

        const user = results[0];
        if(!bcrypt.compareSync(password, user.password_hash)) return res.status(400).send('Invalid credentials');

        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.send({ token });
    });
});

module.exports = router;