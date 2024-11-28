const express = require('express');
const db = require('../database');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get Progress for a User
router.get('/', authenticateToken, (req, res) => {
    const query = `
        SELECT p.progress_percentage, c.title
        FROM progress p
        JOIN courses c ON p.course_id = c.id
        WHERE p.user_id = ?
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).send('Error retrieving progress');
        res.json(results);
    });
});

// Update Progress
router.put('/:course_id', authenticateToken, (req, res) => {
    const { progress_percentage } = req.body;
    const { course_id } = req.params;

    const query = `
        UPDATE progress
        SET progress_percentage = ?
        WHERE user_id = ? AND course_id = ?
    `;
    db.query(query, [progress_percentage, req.user.id, course_id], (err) => {
        if (err) return res.status(500).send('Error updating progress');
        res.send('Progress updated successfully.');
    });
});

module.exports = router;
module.exports = router;