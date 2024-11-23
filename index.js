require('dotenv').config();
const express = require('express');
const router = express.Router();
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');
const quizRoutes = require('./routes/progress');
const badgeRoutes = require('./routes/badges');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware to verify the JWT token
const verifyToken = require('./middleware/verifyToken');

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('api/progress', progressRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/badges', badgeRoutes);

//Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});