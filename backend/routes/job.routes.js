const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// create a connection variable
const con = mysql.createConnection({
    // host: 'database', // server ip address
    host: 'database',
    port: '3306',
    user: 'dbuser', // user name
    password: 'dbuserpwd', // password
    database: 'teamformationassistant', // database name
    // database: 'teamformation'
});

// connect to the database.
con.connect((err) => {
    if (err) throw err;
    // if connection successful
    console.log('connection successful!!!');
});
router.get('/', (req, res) => {
    con.query('SELECT * from Job', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
});
router.post('/', (req, res) => {
    console.log(req.body);
    var records = [[req.body.name, req.body.projectid, req.body.jobphone, req.body.jobrole, req.body.description, req.body.jobaddress]];
    console.log(records);
    if (records[0][0] != null) {
        con.query('INSERT INTO Job (JobName, ProjectId, JobPhone, JobRole, Description, JobAddress) VALUES ?', [records], (err, res, fields) => {
            if (err) throw err;

            console.log(res);
        });
    }

    // execute the algorithm from here

    return res.redirect('http://localhost:3000/add_job_success');
});
module.exports = router;