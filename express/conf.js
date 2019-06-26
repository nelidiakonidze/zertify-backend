const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost', // address of the server
  user: 'root', // username
  password: 'root',
  database: 'company',
});
connection.connect(function(err) {
  if (err) {
    console.log('something went wrong..');
  } else {
    console.log('connected');
  }
});

module.exports = connection;
