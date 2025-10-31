require("dotenv").config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter= require('./src/routes/users')
const recipesRouter= require('./src/routes/recipes')

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true
}));

app.get('/',(req, res)=> res.send({"Success": "Welcome to Node Express Server", "status": "healthy"}))
app.get('/health',(req, res)=> res.send({"status": "healthy"}))
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);

const port = process.env.PORT || process.env.SERVER_PORT || 3040;

// MongoDB Connection
if (process.env.MONGODB_URL) {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MongoDB connected successfully");
    }).catch((err) => {
        console.error("MongoDB connection error:", err);
    });
}

// Start server (for local development)
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

// Export for Vercel serverless
module.exports = app;

