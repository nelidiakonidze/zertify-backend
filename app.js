const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const students = require('./db.json').students;

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));

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

app.listen(port, () => console.log(`Zertify api listening on ${port}!`));
