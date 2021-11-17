var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect("mongodb+srv://Edga:a123456@cluster0.ffj8h.mongodb.net/ShoppingList", {useNewUrlParser: true}, {useUnifiedTopology: true});

const notesShema = {
    first: String,
    second: String
}

const Note = mongoose.model("Note", notesShema);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); 
    //res.render("first", {qs: req.query});
 
})

app.post('/', function(req, res) {
    let newNote = new Note({
    first: req.body.first,
    second: req.body.second
    });
    newNote.save();
    res.redirect('/');
})


app.listen(3000, function() {
    console.log("Server is running")
})