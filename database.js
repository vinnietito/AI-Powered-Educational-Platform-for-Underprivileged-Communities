const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,       // localhost
    user: process.env.DB_USER,       // root
    password: process.env.DB_PASSWORD, // V@38080135k
    database: process.env.DB_NAME    // digital_edu_platform
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to MySQL database.');
    }
});

module.exports = db;
