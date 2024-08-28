require('dotenv').config();
const express = require('express');
const authRouter = require('./route/Auth.js');

const app = express();

const port = process.env.APP_PORT || 3000;

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
    return res.status(404).json({
        status: false,
        message: 'Route not found',
    });
});

app.listen(port, () => {
    console.log(`Server are running on port ${port}`);
});