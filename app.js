const express = require ('express');
var bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const fs = require('fs');
var app = express ();
var port = 3000;
const bcrypt = require('bcryptjs')

var length;

app.use (bodyParser.json ());
app.use (bodyParser.urlencoded ({extended: true}));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/images'));
app.set ('view engine', 'ejs');

mongoose.Promise = global.Promise;
mongoose.connect ('mongodb://localhost:27017/js-basics', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

var db = mongoose.connection;
db.on ('error', console.log.bind (console, 'Connection error'));
db.once ('open', function (callback) {
  console.log ('Connection Succeded');
});

var nameSchema = new mongoose.Schema ({
  firstName: String,
  branch: String,
  sem: Number,
  sec: String,
  email: String,
  num: Number,
  git: String,
  assginee : String,
  status : String
});

var AdmSchema = new mongoose.Schema ({
  firstName: String,
  lastname: String,
  org: String,
  email: String,
  phno: Number,
  pass: String,
  github : String,
  linkedin : String
});

var StuSchema = new mongoose.Schema ({
  firstName: String,
  lastname: String,
  branch: String,
  sem: Number,
  sec: String,
  email: String,
  phno: Number,
  pass: String,
  github : String,
  linkedin : String
});

var User = mongoose.model ('User', nameSchema);
var User_Adm = mongoose.model ('User_Adm', AdmSchema);
var User_Stu = mongoose.model ('User_Stu', StuSchema);
//mongodb search
var findit=User.find({});
app.set('views','./Views');
app.use(express.static('views'));

//go to http://localhost:3000/details to get the required data

app.get('/details',(req, res) => {
	findit.exec(function(err,data){
	if(err) throw err;
    res.render('fetch_details',{members : data});
    console.log(data);
  });
}).listen(3000);
console.log('running on 3000');

app.post ('/sign_up_adm', (req, res) => {

  const newUser = new User_Adm ({
    firstName: req.body.firstname,
    lastname: req.body.lastname,
    org: req.body.org,
    email: req.body.email,
    phno: req.body.phno,
    pass: req.body.pass,
    github : req.body.github,
    linkedin : req.body.linkedin
  })
  
   // Hashing password
      bcrypt.genSalt(8,(err,salt) => {
        bcrypt.hash(req.body.pass , salt , (err,hash) => {
          if(err)  throw err
          
          newUser.pass = hash

          newUser.save (function (err, doc) {
            if (err) res.json (err);
            else {
               console.log (doc);
                res.redirect('/');
            }
            });
        });
    });
});

app.post ('/sign_up_stu', (req, res) => {

  // password and confirm password matched
  if(req.body.pass != req.body.conpass) res.json ('Password do not match ')

  const newUser = new User_Stu ({
    firstName: req.body.firstname,
    lastname: req.body.lastname,
    branch: req.body.branch,
    sem: req.body.sem,
    sec: req.body.sec,
    clg: req.body.clg,
    email: req.body.email,
    phno: req.body.phno,
    pass : req.body.pass,
    github : req.body.github,
    linkedin : req.body.linkedin
  })

   // Hashing password
   bcrypt.genSalt(8,(err,salt) => {
    bcrypt.hash(req.body.pass , salt , (err,hash) => {
      if(err)  throw err

      newUser.pass = hash
      newUser.save (function (err, doc) {
        if (err) res.json (err);
        else {
          console.log (doc);
          res. redirect('/');
        }
      });
      
    })
  })
});


app.post ('/insertData', (req, res) => {
  new User ({
    firstName: req.body.name,
    branch: req.body.branch,
    sem: req.body.sem,
    sec: req.body.sec,
    email: req.body.email,
    num: req.body.num,
    git: req.body.git,
    assginee : "",
    status : ""
  }).save (function (err, doc) {
    if (err) res.json (err);
    else {
      console.log (doc);
      res.send ('Successfully Inserted!');
    }
  });
});

app.get('/', (req, res) => res.render ('index'));
app.get('/student', (req, res) => res.render ('scrum1'));
app.get('/fetch_details', (req, res) => res.render('fetch_details'));
app.get('/regadm', (req, res) => res.render('registeradm'));
app.get('/teamsPage', (req, res) => res.render('teams'));

/*app.listen (port, () => {
  console.log ('server listening on port ' + port);
});*/
