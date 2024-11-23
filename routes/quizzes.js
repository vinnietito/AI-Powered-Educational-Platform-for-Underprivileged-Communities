const express = require('express');
const db = require('../database');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get All Quizzes for a Course
router.get('/:course_id', authenticateToken, (req, res) => {
    const { course_id } = req.params;

    const query = `
        SELECT * FROM quizzes WHERE course_id = ?
    `;
    db.query(query, [course_id], (err, results) => {
        if (err) return res.status(500).send('Error retrieving quizzes');
        res.json(results);
    });
});

module.exports = router;
