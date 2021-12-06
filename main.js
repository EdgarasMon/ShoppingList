const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }))

const dbURI = "mongodb+srv://Edga:a123456@cluster0.ffj8h.mongodb.net/ShoppingList";
mongoose.connect(dbURI, {useNewUrlParser: true}, {useUnifiedTopology: true})
    .then((result) => app.listen(3000), console.log("Server is running"))
    .catch((err) => console.log(err));
 
    
const listShema = new Schema(
    {List: String},
    {timestamps: true}
);

const List = mongoose.model('List', listShema);



app.use(express.static(path.join(__dirname, 'public')));

const viewpath = path.join(__dirname, "public/views")
app.set("views", viewpath)
app.set('view engine', 'ejs')


app.get("/", function(req, res) {
    //res.sendFile("/index.html", { root: __dirname });
    res.render("index");
})

app.post('/', (req, res) => {
    let newNote = new List({
    List: req.body.data2

    });
    if (req.body.data2 != null) {
        newNote.save();
    }
});

app.get('/My_Lists', (req, res) => {    
    List.find().sort({createdAt: -1})
        .then((result) => {
            res.render('My_Lists', {List: result});
        })
        .catch((err) => {
            console.log(err);
        }) 
});


// 404 page
app.use((req, res) => {
    res.sendFile("/404", { root: __dirname })
})





