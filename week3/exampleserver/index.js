const express = require("express");
const { endianness } = require("os");
// const bodyParser = require("body-parser"); DEPRECATED

// "Runs" the express package.
const app = express();

//Allows our express serveer to understand HTTP requests.
const http = require("http").Server(app);

//Use body-parser to convert POST date to JS datatypes.
//Used call method for express instead.
app.use(express.json());
app.use(express.urlencoded( {extended: true} ) );

//Most common "develpment" port is 8080.
const port = 3000; 

//Provide the port number to listen for in Express
http.listen(port);

console.log("Running express server on port " + port + ", use CTRL+C to stop server.");

//Create a wining number on the backend (unable to be seen by frontend user)
const winningNumber = Math.floor((Math.random() * 10) + 1)
console.log("Today's winning number is " + winningNumber, " !");

//Set up express routes

//Root Route, when someone types "Http://localhost:3000/"
app.use("/", express.static("public_html/"));
app.use("/secretwebsite", express.static("public_html/secret/"));


//POST Routes
app.post("/submitNumber", function (request, response) {

    console.log(typeof winningNumber);

    //Build the object to send to front-end.
    let responseObject = {
        message : "",
        someObject: {
                someNumber: 10
        }
    };

    // Grab the object sent from the front end.
    let dataFromFrontEnd = request.body;
    console.log(dataFromFrontEnd);

    //Grab & Convert the number provided by the front end.
    let userNumber = parseInt(dataFromFrontEnd.numberGuess);

    console.log(userNumber);

        //Check if the number is valid if not, send back error message. Otherwise check if winning or losing and send proper message.

        if (Number.isNaN(dataFromFrontEnd.numberGuess)) {
            responseObject.message = "Sorry that number is not valid.";
            
        } else if (winningNumber === dataFromFrontEnd.numberGuess) {
            responseObject.message = "Congrats, you win!";

        } else {
            responseObject.message = "Sorry, but it's not a match!";
        }

    console.log("Our visitor says: " + dataFromFrontEnd.numberGuess);

    response.send(responseObject);

});