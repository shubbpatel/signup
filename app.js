const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const request = require("request");
const { options } = require("nodemon/lib/config");
const { response } = require("express");
const { dirname } = require("path");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",

        }]
    };

    var jsondata = JSON.stringify(data);
    const url = "https://us8.api.mailchimp.com/3.0/lists/a75a619f68";

    const options = {
        method: "POST",
        auth: "shubbpatel:240fd955b44ecbf7e1fd765cdbb36a12-us8"
    }

    const request = https.request(url, options, function(response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");

        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })
    request.write(jsondata)
    request.end();
});

app.post("/success", function(req, res) {
    res.redirect("/");
})



app.listen(3000, function(req, res) {
    console.log("server is runnig on port 3000");
});

//API keys
//240fd955b44ecbf7e1fd765cdbb36a12-us8

//audience id
//a75a619f68