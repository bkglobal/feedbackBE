var express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors');
var app = express();

var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'feedback'
});




// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.post('/checkUser', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    connection.connect((req, res) => {
        console.log('connected');
    });

    connection.query('select * from users where email = "' + email + '" and password = "' + password +'"', function (error, results, fields) {
        if (error) {
            res.json({ data: false });
        } else {
            res.json({ data: results });
        }
    });

    connection.end();

})

app.post('/addUser', (req, res) => {
    // console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    connection.connect((request, response) => {
        console.log('insert into users (email, password) values("' + email + '", "' + password + '" ) ');
        connection.query('insert into users (email, password) values("' + email + '", "' + password + '" ) ', function (error, results, fields) {
            connection.end();

            if (error) {
                res.json({ data: false });
            } else {
                res.json({ data: true });
            }

        });
    });
});


app.post('/feedback', (req, res) => {
    connection.query('select * from feedback ', function (error, results, fields) {
        if (error) {
            res.json({ data: false });
        } else {
            res.json({ data: results });
        }
    });
});


app.post('/addFeedback', (req,res) =>{
    const feedback = req.body.feedback;
    connection.connect((req, res) => {
        console.log('connected');
    });

    connection.query('insert into feedback (feedback) values ("'+ feedback + '")', function (error, results, fields) {
        if (error) {
            res.json({ data: false });
        } else {
            res.json({ data: true });
        }
    });

    connection.end();

})


app.post('/removeFeedback', (req,res) =>{
    const feedback = req.body.feedback;
    connection.connect((req, res) => {
        console.log('connected');
    });

    connection.query('delete from feedback where id = ' + feedback, function (error, results, fields) {
        if (error) {
            res.json({ data: false });
        } else {
            res.json({ data: true });
        }
    });

    connection.end();

})



app.listen(3000, (req, res) => {
    console.log('working fine');
});