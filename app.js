const express = require('express');
// to allow access from any origin to fetch our api (after we can specify a whitelist)
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const list = require('./db.json');
const bodyParser = require('body-parser');

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));

//////////////////
// FOR STUDENTS //
/////////////////
//Show all Students
app.get('/students', (req, res) => {
  return res.send(list.students);
});

//get Students by ID
app.get('/students/:id', (req, res) => {
  // console.log(req.params.id);
  const students = list.students;
  const key = req.params.id;
  const targetStudent = students.filter(student => {
    return student.id == key;
  });
  //console.log(student);
  return res.json({students: targetStudent});
});

//delete students by ID
app.delete('/students/:id', (req, res) => {
  const students = list.students;
  const targetStudent = students.find(student => {
    return student.id == parseInt(req.params.id);
  });
  const index = students.indexOf(targetStudent);
  students.splice(index, 1);
  // console.log(jsonData);
  return res.json(students);
});

// post new students
app.post('/students', (req, res) => {
  const students = list.students;
  const lastItem = students[students.length - 1];
  const lastId = lastItem.id;
  const targetStudent = {
    id: lastId + 1,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  students.push(targetStudent);
  res.send(targetStudent);
});

//////////////////
// FOR COURSES  //
/////////////////
app.get('/courses', (req, res) => {
  return res.send(list.courses);
});

app.get('/courses/:id', (req, res) => {
  // console.log(req.params.id);
  const courses = list.courses;
  const key = req.params.id;
  const targetCourse = courses.filter(course => {
    return course.id == key;
  });
  // console.log(course);
  return res.json({courses: targetCourse});
});

app.delete('/courses/:id', (req, res) => {
  const courses = list.courses;
  const targetCourse = courses.find(course => {
    return course.id == parseInt(req.params.id);
  });
  const index = courses.indexOf(targetCourse);
  courses.splice(index, 1);
  // console.log(jsonData);
  return res.json(courses);
});

app.post('/courses', (req, res) => {
  const courses = list.courses;
  const lastItem = courses[courses.length - 1];
  const lastId = lastItem.id;
  const targetCourse = {
    id: lastId + 1,
    name: req.body.name,
    hours: req.body.hours,
  };
  courses.push(targetCourse);
  res.send(targetCourse);
});

app.listen(port, () => console.log(`Zertify api listening on ${port}!`));
