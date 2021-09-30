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
    con.query('SELECT * from Project', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log('Error while performing Query.');
        }
    });
});


router.post('/', (req, res) => {
    console.log(req.body);
    var records = [[req.body.name, req.body.enddate, req.body.teamsize, req.body.budget, req.body.tools, req.body.priority, 0]];
    console.log(records);
    if (records[0][0] != null) {
        con.query('INSERT INTO Project (ProjectName,ProjectEndDate,ProjectTeamSize,Budget,Tools,Priority,IsAssignmentComplete) VALUES ?', [records], (err, res, fields) => {
            if (err) throw err;

            console.log(res);
        });

        let i = 0;
        let colname = `languagepreferred${i}`;

        while (colname in req.body) {
            var records = [[req.body.languagepreferred0, Number(req.body.skill0), req.body.memberrole0, Number(req.body.availablehoursperweek0), Number(req.body.skillweight[i]), Number(req.body.experienceweight[i]), Number(req.body.hoursweight[i]), Number(req.body.languageweight[i]), Number(req.body.budgetweight[i])]];
            console.log(records);
            con.query('CALL populateRequirements ?', [records], (err, res, fields) => {
                if (err) throw err;

                console.log(res);
            });
            i += 1;
            colname = `languagepreferred${i}`;
        }
    }

    // res.json('Form received...Thank You for signing up :D');

    // execute the algorithm from here

    return res.redirect('http://localhost:3000/add_project_success');
});

module.exports = router;