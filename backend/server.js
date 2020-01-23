const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require('./db');
const usersRouter = require('./routes/users-route');
const projectsRouter = require('./routes/projects-route');
const tasksRouter = require('./routes/tasks-route');

const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));