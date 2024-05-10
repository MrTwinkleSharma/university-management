const express = require('express');
const apiRouter = express.Router();

const students = require('./students');
const departments = require('./departments');
const courses = require('./courses');
const collections = require('./collections');
const faculties = require('./faculties');
const admins = require('./admins');


apiRouter.use('/students', students)
apiRouter.use('/departments', departments)
apiRouter.use('/courses', courses)
apiRouter.use('/collections', collections)
apiRouter.use('/faculties', faculties)
apiRouter.use('/admins', admins)


module.exports = apiRouter;
