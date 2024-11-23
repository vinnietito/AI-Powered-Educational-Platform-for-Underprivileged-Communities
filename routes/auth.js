const express = require('express');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require(Jsonwebtoken);
const db = require('../database');
const router = express.Router();

//User Registration
router.post('/register', (req, res) => {
    const {first_name, last_name, email, password, country, cohort } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    const query = `
        INSERT INTO users (first_name, last_name, email, password_hash, country, cohort)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(query, [first_name, last_name, email, hashedPassword, country, cohort], (err) => {
        if(err) return res.status(500).send('Error registering user');
    })
})