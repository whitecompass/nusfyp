const http = require('http');
const busboy = require('busboy');
const fs = require('fs');
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser')
let mysql = require('mysql');
let connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database: 'fyp3'
  });

var app = express();
const port = 8000;

let username = '';
let matricno = '';

let data = [];

app.get('/', function (req, res){
    res.send(`
        <form action="/upload" enctype="multipart/form-data" method="post">
            <input type="file" name="someCoolFiles"><br>
            <button>Upload</button>
        </form>
    `);
});

app.get('/form', function (req, res){
    res.send(`
    <!DOCTYPE html>  
    <html>
    <body>
    <p>Please input your name and matric number.</p>
    <form action="/form_upload" enctype="multipart/form-data" method="POST">
      Name: <input type="text" id="user_name" name="user_name"> <br>
      Matric No: <input type="text" id="matric_no" name="matric_no"> <br><br>
      <button>Submit</button>
    </form>
    </body>
    </html>
    `);
});

app.post('/upload', function(req, res){
    let filename = '';
    const bb = busboy({ headers: req.headers });
    bb.on('file', (name, file, info) => {
      filename = info.filename;
      const saveTo = path.join(__dirname, filename);
      file.pipe(fs.createWriteStream(saveTo));
    });
    bb.on('close', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(`Upload success: ${filename}`);
    });
    return req.pipe(bb);
});

app.post('/form_upload', function(req, res) {
    //let data = [];
    const bb = busboy({ headers: req.headers });
    bb.on('field', (name, value, info) =>{
        data.push(value);
        //console.log(`Field [${name}]: value: %j`, value);
        //console.log(data);
    });
    bb.on('close', () => {
        console.log('Done parsing form!');
        username = data[0];
        matricno = data[1];
        console.log(username, matricno);
        let update = `INSERT INTO records(StudentName, MatricNo) VALUES ("${username}", "${matricno}")`;
        connection.query(update);
        res.writeHead(303, { Connection: 'close', Location: '/' });
        res.end();
        connection.end();
    });
    return req.pipe(bb);
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port} ...`);
});

// connect to the MySQL server
connection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    } else{
      console.log("Successfully connected to database!");
    }
  
    let createTable = `create table if not exists records(id int primary key auto_increment, StudentName varchar(255)null, MatricNo varchar(255)null default 0)`;
  
    connection.query(createTable, function(err, results, fields) {
      if (err) {
        console.log(err.message);
      }
    });
  
  
});
