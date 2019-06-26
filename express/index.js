const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
const connection = require('./conf');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.get('/api/movies', (req, res) => {
  connection.query('SELECT * from movie', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving movies');
    } else {
      res.json(results);
    }
  });
});

app.get('/api/movies/names', (req, res) => {
  connection.query('SELECT name from movie', (err, results) => {
    if (err) {
      res.status(500).send('Error retrieving names');
    } else {
      res.json(results);
    }
  });
});

app.post('/api/movies', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO movie SET ?', formData, (err, results) => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send('Error saving a movie');
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

app.put('/api/movies/:id', (req, res) => {
  const idMovie = req.params.id;
  const formData = req.body;

  connection.query(
    'UPDATE movie SET ? WHERE id = ?',
    [formData, idMovie],
    err => {
      if (err) {
        // If an error has occurred, then the user is informed of the error
        console.log(err);
        res.status(500).send('Error editing an movie');
      } else {
        // If everything went well, we send a status "ok".
        res.sendStatus(200);
      }
    },
  );
});

app.delete('/api/movies/:id', (req, res) => {
  // Get the data sent
  const idMovie = req.params.id;

  // connection to the database, and insertion of the employee
  connection.query('DELETE FROM movie WHERE id = ?', [idMovie], err => {
    if (err) {
      // If an error has occurred, then the user is informed of the error
      console.log(err);
      res.status(500).send('Error deleting a movie');
    } else {
      // If everything went well, we send a status "ok".
      res.sendStatus(200);
    }
  });
});

app.listen(port, error => {
  if (error) {
    throw new Error('wrong path');
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
