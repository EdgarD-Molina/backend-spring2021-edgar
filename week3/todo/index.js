const express = require("express")

const app = express() ;

const http = require("http").Server(app);

const port = 3000;

http.listen(port);

console.log("Express server is now running on port " + port, 
"use CTRL + C to end server host.");

// Body Parser
app.use(express.json({strict: false}));
app.use(express.urlencoded({extended: false}));

app.use("/", express.static("public_html/"));