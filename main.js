var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
//import { listStorage } from './public/javascript.js';


app.use(bodyParser.urlencoded({ extended: false }))


mongoose.connect("mongodb+srv://Edga:a123456@cluster0.ffj8h.mongodb.net/ShoppingList", {useNewUrlParser: true}, {useUnifiedTopology: true});

const notesShema = {
    first: String,
    second: String
}

const Note = mongoose.model("Note", notesShema);

app.use(express.static(path.join(__dirname, 'public')));


app.get("/", function(req, res) {
    res.sendFile("/index.html", { root: __dirname });
})

app.post('/', function(req, res) {
    let newNote = new Note({
    first: req.body.first,
    second: req.body.Qty
    //List: listStorage
    });
    newNote.save();

    //res.redirect('/');
})


// 404 page
app.use((req, res) => {
    res.sendFile("/404.html", { root: __dirname })
})

app.listen(3000, function() {
    console.log("Server is running")
})




