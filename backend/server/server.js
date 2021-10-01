const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

var corsOptions = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api/teams', require('./app/routes/team.routes'))
app.use('/api/members', require('./app/routes/member.routes'))
app.use('/api/candidates', require('./app/routes/candidate.routes'))
app.use('/api/jobs', require('./app/routes/job.routes'))
app.use('/api/projects', require('./app/routes/project.routes'))
// database
const db = require("./app/models");
const Role = db.role;

const mysql = require('mysql2')
const dbConfig = require('./app/config/db.config')

// create a connection variable
const con = mysql.createConnection({
    // host: 'database', // server ip address
    host: '3.83.120.177',
    port: '3306',
    user: 'dbuser', // user name
    password: 'dbuserpwd', // password
    // database: 'teamformationassistant'
    database: 'teamformation'
});

// connect to the database.
con.connect((err) => {
    if (err) throw err;
    // if connection successful
    console.log('connection successful!!!');
});

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to Teamformation Assistant."});
});



// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    Role.create({
        id: 1,
        name: "user"
    });

    Role.create({
        id: 2,
        name: "manager"
    });

    Role.create({
        id: 3,
        name: "admin"
    });
}