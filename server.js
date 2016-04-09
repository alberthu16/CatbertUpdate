var express = require('express');
var app = express();
var twilio = require('twilio');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

console.log("using static folder: bootstrap");
app.use(express.static(__dirname + '/bootstrap'));

// Twilio Credentials
var accountSid = process.env.TWILIO_SID;
var authToken = process.env.TWILIO_AUTH_TOKEN;
var phoneNumber = '+16263765640'; // test phone number
var twilioPhone = '+12017629217';

//require the Twilio module and create a REST client
var client = new twilio.RestClient(accountSid, authToken);

// home page
app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "patient.html" );
})

// This sends a message to subscribed numbers
app.post('/process_post', urlencodedParser, function (req, res) {
    console.log("sending message!");
    var m = String(req.body.message);
    console.log(m);
    client.messages.create({
        to: phoneNumber,
        from: twilioPhone,
        body: m,
    }, function(err, message) {
        if (!err) {
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
            console.log('Message sent on:');
            console.log(message.dateCreated);
        } else {
            console.log('Oops! There was an error.');
        }
    });
    res.end("HI");
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
})