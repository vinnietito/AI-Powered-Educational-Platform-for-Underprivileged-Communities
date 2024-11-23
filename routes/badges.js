const express = require('express');
const db = require('../database');
const authenticateToken = require('../middleware/auth');
const router = express.Router();

// Get All Badges for a User
router.get('/', authenticateToken, (req, res) => {
    const query = `
        SELECT * FROM badges WHERE user_id = ?
    `;
    db.query(query, [req.user.id], (err, results) => {
        if (err) return res.status(500).send('Error retrieving badges');
        res.json(results);
    });
});

module.exports = router;
