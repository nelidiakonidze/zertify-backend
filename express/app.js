const express = require('express')
const app = express()
const path = require('path')

app.get('/api/movies', function(req, res) {
  res.send("All films")
})

app.get('/api/movies/:moviesid', function(req, res) {
  const moviesid = req.params.id;
  const jsonresponse = {id: moviesid};
  res.json(jsonresponse)
})

// app.get('/api/employee', function(req, res) {
//   res.sendStatus(304);
// });

app.get('/api/employee', (request, response) => {
  if (request.query.name) {
    response.status(404).send('Unable to retrieve employee: ' + request.query.name);
  } else {
    response.sendStatus(304);
  }
});
app.listen(port, (err) => {
  if (err) {
    throw new Error('Ups wrong path...');
  }

  console.log(`Server is listening on ${port}`);
});


app.listen(3000)