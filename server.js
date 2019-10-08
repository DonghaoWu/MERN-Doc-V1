//*1.3
//package
const express = require('express');
const connectDB = require('./config/db');
//apply
const app = express();
//middleware
app.use(express.json({ extended: false }));
//port
const PORT = process.env.PORT || 4000;

/*
DB here!
*/
connectDB();

/*
Routes here!
*/

app.listen(PORT, () => console.log(`server is listening on port ${PORT} ===>`));