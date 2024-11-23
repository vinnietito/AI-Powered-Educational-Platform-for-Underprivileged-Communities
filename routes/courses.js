const express = require('express');
const db = require('../database');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get All Courses
router.get('/', (req, res) => {
    const query = 'SELECT * FROM courses';
    db.query(query, (err, results) => {
        if (err) return res.status(500).send('Error retrieving courses');
        res.json(results);
    });
});

// Add a New Course (Admin Only)
router.post('/', authenticateToken, (req, res) => {
    const { title, description, url, difficulty } = req.body;

    const query = `
        INSERT INTO courses (title, description, url, difficulty)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [title, description, url, difficulty], (err) => {
        if (err) return res.status(500).send('Error adding course');
        res.send('Course added successfully.');
    });
});

module.exports = router;
