const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const zList = require('./db.json');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));

//#Students:
//Show all Students
app.get('/api/students', (req, res) => {
  res.send(zList.students);
});

//get Students by ID
app.get('/api/students/:id', (req, res) => {
  const students = zList.students;
  const student = students.find(target => target.id === parseInt(req.params.id));
  res.send(student);
});

//Post new students
app.post('/api/students/', (req, res) => {
  const students = zList.students;
  const lastItem = students[students.length - 1];
  const lastId = lastItem.id;
  const student = {
    id: lastId + 1,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  students.push(student);
  res.send(student);
});

//delete students by ID
app.delete('/api/students/:id', (req, res) => {
  const students = zList.students;
  const student = students.find(target => target.id === parseInt(req.params.id));
  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send(student);
});

//#Courses
//Show all Courses
app.get('/api/courses', (req, res) => {
  res.send(zList.courses);
});

//show courses by ID
app.get('/api/courses/:id', (req, res) => {
  const courses = zList.courses;
  const course = courses.find(target => target.id === parseInt(req.params.id));
  res.send(course);
});

//Post new Courses
app.post('/api/courses/', (req, res) => {
  const courses = zList.courses;
  const lastItem = courses[courses.length - 1];
  const lastId = lastItem.id;
  const course = {
    id: lastId + 1,
    name: req.body.name,
    hours: req.body.hours,
  };

  courses.push(course);
  res.send(course);
});

//delete courses by id
app.delete('/api/courses/:id', (req, res) => {
  const courses = zList.courses;
  const course = courses.find(target => target.id === parseInt(req.params.id));
  res.send(course);
});

app.listen(port, () => console.log(`Zertify api listening on ${port}!`));
