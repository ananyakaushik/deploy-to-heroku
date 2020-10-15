var express = require('express');
var app = express();
var path = require('path');

var pgp = require('pg-promise')(/* options */)
var db = pgp('postgres://localhost:5432/ananyaheroku')

// const bodyParser = require('body-parser'); 
// app.use(bodyParser.json()) 
// app.use(bodyParser.urlencoded({ extended: false })); 


function getUser() {
    return db.any('SELECT * from persons');
        // .then(function (data) {
        //     console.log('DATA:', data)
        // })
        // .catch(function (error) {
        //     console.log('ERROR:', error)
        // })
}
// const { Pool } = require('pg');
// const pool = new Pool({
//     // Make sure you swap out <database_name>
//     connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/ananyaheroku',
//     // Use SSL but only in production
//     // ssl: process.env.NODE_ENV === 'production'
//     ssl: {
//         rejectUnauthorized: false
//     }
//   });

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/persons', function(req, res) {
    getUser()
    .then(testData => { 
        console.log(testData); 
        res.send(testData.rows); 
    }) 
});

app.listen(3000, function() {
    console.log('Listening on port 3000...');
});

// const http = require('http');
// const fs = require('fs');

// const hostname = '127.0.0.1';
// const port = 3000;

// fs.readFile('index.html', (err, html) => {
//     if (err) {
//       throw err;
//     }

//     const server = http.createServer((req, res) => {
//         res.statusCode = 200;
//         res.setHeader = ('Content-type', 'text/html');
//         res.write(html);
//         res.end();
//     });

//     server.listen(port, hostname, () => {
//         console.log('Server running on port ' + port + '...');
//     });
// });