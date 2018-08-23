var port = process.env.PORT || 4000;

var express = require("express"); //lets you communicate with the back end
var fs = require("fs");
var path = require("path"); // creates the path, the path that connects to your form
var nodemailer = require("nodemailer");
var app = express(); //express is a funtcion so you have to call it

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "fviclass@gmail.com",
    pass: "fviclass2017"
  }
});
// this is where the email will be sent from

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // this does a body parse

//purpose of this is to enable cross domain requests
// Add headers
app.use(function (req, res, next) {
  // var allowedOrigins = ['http://ktarver.techlaunch.io:8000', 'http://142.93.198.70:8000'];
  // var origin = req.headers.origin;
  // if (allowedOrigins.indexOf(origin) > -1) {
  //   res.setHeader('Access-Control-Allow-Origin', origin);
  // }

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use("/", express.static(path.join(__dirname, "assets"))); // this lets you expose your assets folder

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
}); // listensnt to any get request

//purpose of this is to enable cross domain requests
// Add headers


app.post("/", function(req, res) {
  //listens to any post request
  console.log(req.body);

  var emailBody = fs.readFileSync("/assets/resume.html");

  var mailOptions = {
    from: req.body.from,
    to: req.body.destination,
    html: emailBody,
    subject: req.body.subject
  };

  transporter.sendMail(mailOptions, function(err, info) {
    if (err)
      res.send({
        success: false,
        message: err.message
      });

    res.send({
      success: true,
      message: "Your resume has been successfully send"
    });
  });
});

app.listen(port, function(err) {
  if (err) {
    return console.log(err);
  }
  console.log("server listening on port", port);
});

// var port = process.env.PORT || 4000;
// var express = require('express');
// var fs = require('fs');
// var path = require('path');
// var nodemailer = require('nodemailer');
// var app = express();
// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'fviclass@gmail.com',
//     pass: 'fviclass2017'
//   }
// });
// // Parse the request body
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// // Expose static content like css, js, images
// app.use('/', express.static(path.join(__dirname, 'public')));
// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'form.html'));
// });
// app.post('/email-resume',
// function(req, res, next){
//   if(req.body.from) {
//     next();
//   }
//   else {
//     res.send({
//       success: false,
//       message: 'Missing from'
//     });
//   }
// },
// function(req, res, next){
//   if(req.body.destination) {
//     next();
//   }
//   else {
//     res.send({
//       success: false,
//       message: 'Missing destination'
//     });
//   }
// },
// function(req, res, next){
//   if(req.body.subject) {
//     next();
//   }
//   else {
//     res.send({
//       success: false,
//       message: 'Missing subject'
//     });
//   }
// },
// function(req, res, next) {
//   console.log(req.body);
//   var emailBody = fs.readFileSync('./resume.html');
//   var mailOptions = {
//     from: req.body.from,
//     to: req.body.destination,
//     html: emailBody,
//     subject: req.body.subject
//   };
//   transporter.sendMail(mailOptions, function (err, info) {
//     if(err) {
//       return res.send({
//         success: false,
//         message: err.message
//       });
//     }
//     res.send({
//       success: true,
//       message: 'Your resume has been successfully sent'
//     });
//   });
// });
// app.listen(port, function(err) {
//   if (err) return console.log(err);
//   console.log('server listening on port ', port);
// });

// Collapse
