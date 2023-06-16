require("dotenv").config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRouter= require('./src/routes/users')
const recipesRouter= require('./src/routes/recipes')

const app = express();

app.use(express.json());
app.use(cors());
app.use('/auth', userRouter);
app.use('/recipes', recipesRouter);
const port = 3040
mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Mongodb connected");
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}).catch((err) => {
    console.log({ err });
    process.exit(1);
});

