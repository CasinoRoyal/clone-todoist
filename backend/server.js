const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require('./db');
const usersRouter = require('./routes/users-route');

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', usersRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));