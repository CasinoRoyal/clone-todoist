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
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers', 
    'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
  );
  next();
});

app.use(morgan("dev"));
app.use(express.json());

app.use('/api/users', usersRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/tasks', tasksRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port ${port}`));