const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// create a connection variable
const con = mysql.createConnection({
  host: 'database', // server ip address
  port: '3306',
  user: 'dbuser', // user name
  password: 'dbuserpwd', // password
  database: 'teamformationassistant', // database name
});

// connect to the database.
con.connect((err) => {
  if (err) throw err;
  // if connection successful
  console.log('connection successful!!!');
});
router.get('/', (req, res) => {
    con.query('SELECT * from Team', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
});
module.exports = router;