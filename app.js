const express = require('express');
// to allow access from any origin to fetch our api (after we can specify a whitelist)
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;
const students = require('./db.json').students;
const courses = require('./db.json').courses;

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

app.use(cors());

// app.all('/', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With');
//   next();
// });

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));

//////////////////
// FOR STUDENTS //
/////////////////
app.get('/zstudents', (req, res) => {
  return res.send(students);
});

app.get('/zstudents/:id', (req, res) => {
  // console.log(req.params.id);
  const key = req.params.id;
  const targetStudent = students.filter(student => {
    return student.id == key;
  });
  // console.log(student);

  return res.json({students: targetStudent});
});

app.delete('/zstudents/:id', (req, res) => {
  const targetStudent = students.filter(student => {
    return student.id == req.params.id;
  });
  const index = students.indexOf(targetStudent[0]);
  students.splice(index, 1);
  // console.log(jsonData);

  return res.json(students);
});

//   return (
//     err => {
//       if (err) {
//         console.log(err);
//         res.status(500).send('Error deleting student');
//       } else {
//         res.sendStatus(200);
//       }
//     }
//   );
// })

//////////////////
// FOR COURSES  //
/////////////////
app.get('/zcourses', (req, res) => {
  return res.send(courses);
});

app.get('/zcourses/:id', (req, res) => {
  // console.log(req.params.id);
  const key = req.params.id;
  const targetCourse = courses.filter(course => {
    return course.id == key;
  });
  // console.log(course);
  return res.json({courses: targetCourse});
});

app.delete('/zcourses/:id', (req, res) => {
  const targetCourse = courses.filter(course => {
    return course.id == req.params.id;
  });
  const index = courses.indexOf(targetCourse[0]);
  courses.splice(index, 1);
  // console.log(jsonData);
  return res.json(courses);
});

app.listen(port, () => console.log(`Zertify api listening on ${port}!`));
