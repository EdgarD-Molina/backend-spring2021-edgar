//Allows us to use the mongoose software.
const mongoose = require("mongoose");

//Credentials and location for our Mongo database.
const databaseConnect = "mongodb+srv://PasswordUser:nothankyoudude@meda-spring2021-edgar.988c2.mongodb.net/example_database?retryWrites=true&w=majority";

//Settings and options for Mongoose connection.
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
};

//Connect to database. Teest if we have an error. If so, console log it, otherwise state it as a success.
mongoose.connect(databaseConnect, options, function (error) {
    if (error) {
        console.log("something happened here!" + error);
    } else {
        console.log("Connection to mongoDB succesful! use ctrl + C to close");
    }
});

//Objects representing the MongoDB connection.
let db = mongoose.connection;

// Send MongoDB errors to the console.
db.on("error", console.error.bind(console, "We had a Mongo error "));

//Let mongoose have a copy of Promise class.
mongoose.Promise = global.Promise

//Schemas Section, describes how our MongoDB documents should look like. This includes properties and values.
let Schema = mongoose.Schema
let ourSchema = new Schema({
    food: String,
    location: String
});

//Mongoose Model, describes where to save documents and how the document should look like, using a specific schema.
let exampleModel = new mongoose.model("example_collections", ourSchema);

//Creating our first document, we provide an object to fullfill schema requirements.
let firstDocument = new exampleModel({
    food: "enchiladas",
    location: "west tennyson"
})

//Saving our first document, callback function checking for errors.
firstDocument.save(function (error) {
    if (error) {
        console.log("Failed to save document" + error);
    } else {
        console.log("Succesfully saved document!");
    }
});

//Searcges the exampleModel with a specific ID, and updates that document with the values provided in the second argument (provided as an object)
exampleModel.findByIdAndUpdate("6086ed8ec4640e0650afe5dd", {location: "Arkham"},function (error, results) {
    if (error) {
        console.log("Failed to update: " + error);
    } else {
        console.log("Succesfully updated, here is the old copy: ", + results);
    }
});

exampleModel.findByIdAndDelete("6086ed8ec4640e0650afe5dd", function (error, results) {
    if (error) {
        console.log("Failed to delete: " + error);
    } else {
        console.log("Succesfully deleted: " + results);
    }
});

//Searches the collection for matching documents based on the first argument of find(). Returns matching documents in the results parameter.
exampleModel.find( {food: "enchiladas"}, function (error, results) {
    if (error) {
        console.log("Sorry, unable to find: " + error);
    } else {
        console.log("Cool, we found the following: " + results);
    }
} );