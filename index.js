const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const progressRoutes = require('./routes/progress');

const app = express();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('api/progress', progressRoutes);