const express = require('express');
const { Client } = require('pg');
const connectionString = 'postgres://xikaepnupjihny:ed8939f2a3555e38e3ff018e0adb5885463936afffd70c501f6b1d5fcefdf7a3@ec2-3-218-75-21.compute-1.amazonaws.com:5432/d8muah1afp73t';

const client = new Client({
    connectionString: connectionString
});

client.connect();

var app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function (req, res, next) {
    client.query('SELECT * FROM Employee where id = $1', [1], function (err, result) {      
        if (err) {
            console.log(err);
            res.status(400).send(err);
        }
        res.status(200).send(result.rows); 
    });
});

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});
