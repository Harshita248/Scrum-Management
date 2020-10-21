const express = require ('express');
var bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
const fs = require('fs');
var app = express ();
var port = 3000;

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

var User = mongoose.model ('User', nameSchema);
//mongodb search
var findit=User.find({});
app.set('views','./views');
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
app.get('/admin', (req, res) => res.render ('loginForm'));
app.get('/fetch_details', (req, res) => res.render('fetch_details'));
app.get('/regadm', (req, res) => res.render('registeradm'));
app.get('/regstu', (req, res) => res.render('registerstu'));

/*app.listen (port, () => {
  console.log ('server listening on port ' + port);
});*/
