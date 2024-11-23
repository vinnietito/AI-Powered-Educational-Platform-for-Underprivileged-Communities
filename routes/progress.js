const express = require('express');
const authenticateToken = require('../middleware/auth'); // Import the middleware
const db = require('../database'); // Import the database connection

const router = express.Router();

// Protected route: Get user progress
router.get('/', authenticateToken, (req, res) => {
    const userId = req.user.id; // Extracted from the JWT
    const query = `
        SELECT p.course_id, c.title, p.progress_percentage
        FROM progress p
        JOIN courses c ON p.course_id = c.id
        WHERE p.user_id = ?;
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error.', error: err });
        }
        res.json({ progress: results });
    });
});

module.exports = router;
