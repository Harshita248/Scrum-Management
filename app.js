
var express = require("express");
var app = express();
var port = 3000;

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/css",express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/html"));


var mongoose = require("mongoose"); 
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/js-basics");

var db = mongoose.connection;
db.on('error', console.log.bind(console, "Connection error"));
db.once('open', function (callback) {
  console.log('Connection Succeded');
})

var nameSchema = new mongoose.Schema({
    firstName: String,
    branch: String,
    sem: Number,
    sec: String,
    email: String,
    num: Number,
    git: String
});


var User = mongoose.model("User", nameSchema);

app.get('/fetch', (req, res) => {
    // User.find({email : 'sweta.sahoo029@gmail.com'})
    User.find({}).select('firstName')
    .then(doc => {
        console.log(doc);
    }).catch(err =>{
        console.log(err);
    })
});

app.get('/view',function(req,res){
    User.find({},function(err,docs){
        if(err)res.json(err);
        else res.render();
    });

});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.get("/student", (req, res) => {
    res.sendFile(__dirname + "/assets/html/scrum1.html");
});

app.get("/admin", (req, res) => {
    res.sendFile(__dirname + "/assets/html/loginForm.html");
});

app.post("/new", (req, res) => {
    new User({
        firstName: req.body.name,
        branch: req.body.branch,
        sem: req.body.sem,
        sec: req.body.sec,
        email: req.body.email,
        num: req.body.num,
        git: req.body.git
    }).save(function (err, doc) {
        if (err) res.json(err)
        else {
            console.log(doc);
            res.send("Successfully Inserted!");
        }
    });
});


// app.get('/details',function(req,res){
//     console.log("getting all the details");
// User.find({})
// exec(function(err,details))
// {
//     if(err){
//         res.send("error has occired");
//     }
//     else 
//     {
//         console.log(details);
//         res.json(details);
//     }

// });

// });



// app.get("/addName",(req,res)=>{
//  var myData = new User(req.body);
//  myData.save()
//  .then(item => {
//  res.send("item saved to database");
//  })
//  .catch(err => {
//  res.status(400).send("unable to save to database");
//  });
// });
app.listen(port, () => {
    console.log("server listening on port " + port);

});
//
// 
// 
// 
// 
// 
// 
// 
// 
// 





// app.get('/',(req, res) => {
//     connection.query("SELECT * FROM chat",(err, result) => {
//         if(err) {
//             console.log(err); 
//             res.json({"error":true});
//         }
//         else { 
//             console.log(result); 
//             res.json(result); 
//         }
//     });
// });


        // function validate() {
        //     alert("Thank You for fiiling this form. We will get back to you soon.");
        //     var firstName = document.getElementById("name");
        //                var regx1 = /^[A-Za-z .]{3,20}$/;
        //                if (n.value.match(' * ')) {
        //                    alert("Invalid Name");
        //                }
        //                if (regx1.test(n.value)) {
        //                    alert("correct");
        //                }
        //     var branch = document.getElementById("branch");
        //                if (b.value.match(' *')) {
        //                    alert("Invalid Branch");
        //                }
        //     var sem = document.getElementById("Sem");
        //                if (!sem.value.match(' *')) {
        //                    alert("Invalid Sem");
        //                }
        //     var sec = document.getElementById("sec");
        //                if (!secn.value.match(' *')) {
        //                    alert("Invalid Section");
        //                }
        //     var email = document.getElementById("email");
        //                if (!e.value.match(' *')) {
        //                    alert("Invalid Email address");
        //                }
        //     var num = document.getElementById("num");
        //                if (!no.value.match(' *')) {
        //                    alert("Invalid Mobile number");
        //                }
        //     var git = document.getElementById("git");
        //                if (!git.value.match(' *')) {
        //                    alert("Invalid Github link");
        //                }  

        //         }

