const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
app.post("/", function (req, res) {

    var firstName = req.body.fname;
    var lastName = req.body.lname;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields:{
                  FNAME:firstName,
                  LNAME:lastName
                }
            }
        ]
    };



    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us8.api.mailchimp.com/3.0/lists/2b9fc33a00",
        
        method: "POST",
        headers: {
            Authorization: "auth 16614aee3aa761a98275ad518c9836a7-us8"
        },
        body: jsonData
    };
    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        }
        else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            }
            else {
                res.sendFile(__dirname+"/failure.html");
            }
        }

    });
});
app.post("/failure", function(req,res){
    res.redirect("/");
});

const port= process.env.PORT || 3000;

app.listen(port, function () {
    console.log("server is running on port 3000");
});

//https://us8.admin.mailchimp.com/lists/dashboard/overview?id=865560
// Api Key --- 16614aee3aa761a98275ad518c9836a7-us8
//  2b9fc33a00