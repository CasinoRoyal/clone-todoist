const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require('./db');
const usersRouter = require('./routes/users-route');
const projectsRouter = require('./routes/projects-route');
const tasksRouter = require('./routes/tasks-route');

const app = express();
connectDB();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));