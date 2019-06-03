const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jsonData = require('./db.json');

app.get('/', (req, res) => res.send('Welcome to Zertify Api'));
app.get('/zstudents', (req, res) => {
  return res.send(jsonData);
});

app.listen(port, () => console.log(`Zertify api listening on ${port}!`));
