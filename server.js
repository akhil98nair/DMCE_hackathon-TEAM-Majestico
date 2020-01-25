
var port = process.env.PORT || 3000;
var session = require('express-session');
const express = require('express');
const path = require('path');
var cookie = require('cookie');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const mysqlBackbone = require('mysql-backbone');
const multer = require('multer');
const FTPStorage = require('multer-ftp');
const fs = require("fs")
const app = express();
const url = require("url");
const dateTime = require('date-time');
const bcrypt = require('bcryptjs');
var session = require('express-session');
const dotenv = require('dotenv').config();
var sessionstorage = require('sessionstorage');
const saltRounds = 10;
var datetime = new Date();
var today_date = datetime.toISOString().slice(0, 10);
//joining path of directory 
const directoryPath = path.join(__dirname, 'public/uploads');
var doc_id, insert_id;

//memory leak issue solving line and session creation
var MemoryStore = require('memorystore')(session)

app.use(session({
  cookie: { maxAge: 86400000 },
  store: new MemoryStore({
    checkPeriod: 86400000 // prune expired entries every 24h
  }),
  resave: false,
  saveUninitialized: false,
  secret: 'sies docs'
}))

//for awaking mysql connection
setInterval(function () {
  connection.query('SELECT 1');
}, 60000);

//Creating Get Connection Function for creating connection by simply calling it.

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  multipleStatements: true
});

connection.connect(function (err) {
  if (err) console.log(err);
  else {

    console.log("connected");
  }
});


//for cache control
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
})


//for passing session to ejs
app.use(function (req, res, next) {
  res.locals.user = req.session.user_id;
  res.locals.user_type = req.session.user_type;
  res.locals.username = req.session.username;
  next();
});


// 

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads')

  },
  filename: (req, file, cb) => {
    req.session.ftpfilename = Date.now() + file.originalname,
      req.session.userfilename = file.originalname,
      console.log(req.session.ftpfilename)
    cb(null, req.session.ftpfilename)
  }
});

// this saves your file into a directory called "uploads"
const upload = multer({
  storage: storage
});


//setting view engine to ejs, to able to render ejs files
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/views"));

//including public folder for accessing files present in public folder
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views/partials"));
var urlencodedParser = bodyParser.urlencoded({ extended: false });



//Setting the homepage or start page Route
app.get('/', function (req, res) {

  results = cookie.parse(req.headers.cookie || '')
  console.log(results['adhar_no'])
  console.log(results['adhar_no'] !== undefined)
  res.render('pages/fortune-teller-portal');


});

app.get('/psychometric', function (req, res) {
  var qry1 = "select * from contents where content_domain = 'Psychometric'; ";
  connection.query(qry1, function (error, results, fields) {
    if (error) console.log(error);
    else {
      res.render("pages/index", { result: results });
    }

  });
});

app.get('/start_quiz', function(req, res){
res.render("pages/select_cat_quiz");
});

app.post('/quiz', urlencodedParser, function (req, res) {
  var qry1 = `select * from contents where content_domain='${req.body.domain}'|| content_domain='${req.body.domain1}' ; `;
  console.log(qry1);
  connection.query(qry1, function (error, results, fields) {
    if (error) console.log(error);
    else {
      res.render("pages/index", { result: results });
    }

  }); })

  app.post('/finish_test', urlencodedParser, function (req, res) {
    
     console.log(req.body.someInput);
     if(req.body.someInput > 6){
      res.render("pages/pass", {marks: req.body.someInput});
     }
     else{
      res.render("pages/fail", {marks: req.body.someInput || 0});
     }
        
      
  
   

});

app.get('/cards', function (req, res) {

  res.render('pages/cards');

});
app.get('/register', function (req, res) {

  res.render('pages/check_aadhaar');

});
app.get('/pass', function (req, res) {

  res.render('pages/pass');

});

app.get('/uploadfile', function (req, res) {

  res.render('pages/uploadfile');

});
app.get('/chatbot', function (req, res) {

  res.render('pages/fortune-teller');

});


//Setting the homepage or start page Route
app.get('/register', function (req, res) {
  res.render('pages/check_aadhaar');
});

//Route for Upload File
app.get('/uploadfile', function (req, res) {

  res.render('pages/uploadfile');

});
app.post('/submit_regform', urlencodedParser, function (req, res) {
  
  console.log(name, age, gender, area, occupation)
  var name = req.body.name;
  var aadhaar = req.body.aadhaar;
  var age = req.body.age;
  var gender = req.body.gender;
  var area = req.body.area;
  var occupation = req.body.occupation;
  console.log(name,aadhaar, age, gender, area, occupation)

  var document = mysqlBackbone.Model.extend({
    connection: connection,
    tableName: "user_details",
  })
  var user = new document({
    name: req.body.name,
    aadhaar_no: req.body.aadhaar,
    age: req.body.age,
    gender: req.body.gender,
    area: req.body.area,
    occupation: req.body.occupation,
  })

  user.save().then(function (result) {
    if (result.affectedRows !== 0) {
      console.log("User added")
      res.redirect("/register")
    }
  })
})

app.post('/submit_aadhaar', urlencodedParser, function (req, res) {
  var aadhaar = req.body.aadhaar;
  var qry1 = `select * from user_details where aadhaar_no =${aadhaar}; `;
  connection.query(qry1, function (error, results, fields) {
    if (error) console.log(error);
    else if(results.length>0){
      res.redirect("/psychometric");
    }
  else{
    res.render("pages/register", { aadhaar: req.body.aadhaar });
  }});})

  

//Route for Upload File
app.post('/submit_uploadfile', upload.single('upload_file'), urlencodedParser, function (req, res) {

  var content_domain = req.body.content_domain;
  var pyscometric = req.body.pyscometric;
  var content_type = req.body.content_type;
  var option_1 = req.body.option_1;
  var option_2 = req.body.option_2;
  var option_3 = req.body.option_3;
  var correct_option = req.body.correct_option;
  var question = req.body.question;
  console.log(content_type, content_domain, pyscometric, option_1, option_2, option_3, correct_option, question)

  var document = mysqlBackbone.Model.extend({
    connection: connection,
    tableName: "contents",
  });

  var content = new document({
    content_domain: req.body.content_domain,
    pyscometric: req.body.pyscometric,
    content_type: req.body.content_type,
    content_path: req.session.ftpfilename,
    option_1: req.body.option_1,
    option_2: req.body.option_2,
    option_3: req.body.option_3,
    correct_option: req.body.correct_option,
    question: req.body.question,
  });
  content.save().then(function (result) {
    if (result.affectedRows !== 0) {
      console.log("File Uploaded");
      res.redirect("/uploadfile")
    }
  });

});


//Creating a Listen Port for accepting Requests
app.listen(port, function () {
  console.log('Listening at port 3000');
});