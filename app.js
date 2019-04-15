var express = require('express');
var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    database: 'feedback'
});

connection.connect((req,res)=>{
    console.log('connected');
});


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//     if (error) throw error;
//     console.log('The solution is: ', results[0].solution);
// });

connection.end();


app.post('/checkUser', (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    connection.query('select * from users where email = '+ email +' and password = ' + password , function (error, results, fields) {
        if (error) {
            res.json({data: false});
        } else {
        res.json({data:results}); }

    });
})

app.post('/addUser', (req,res)=>{
    console.log(req.body);
    // const email = req.body.email;
    // const password = req.body.password;
    
    // connection.query('insert into users (email, password) values ("'+ email + '", "' + password + '" ) ' , function (error, results, fields) {
    //     if (error) {
    //         res.json({data: false});
    //     } else {
    //     res.json({data:results}); }

    // });
})


app.post('/feedback',(req,res)=>{
    connection.query('select * from feedback ' , function (error, results, fields) {
        if (error) {
            res.json({data: false});
        } else {
        res.json({data:results});}
    });
})

app.listen(3000, (req, res) => {
    console.log('working fine');
});