const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonData = require('./db.json');

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   }),
// );

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));

app.get('/zstudents', (req, res) => {
  return res.send(jsonData);
});

app.get('/zstudents/:id', (req, res) => {
  // console.log(req.params.id);
  const key = req.params.id;
  const listStudent = jsonData.students.filter(student => {
    return student.id == key;
  });
  // console.log(student);

  return res.json({students: listStudent});
});

// app.delete('/zstudents/:id', (req, res) => {
//   const key = req.params.id;
//   const listStudent = jsonData.students.filter(student => {
//     return student.id == key;
//   });
//   const deleteStudent = listStudent.find(
//     target => target.id === parseInt(req.params.id),
//   );
//   const index = deleteStudent.indexOf(listStudent);
//   deleteStudent.splice(index, 1);
//   return res.json({listStudent});
// });

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
