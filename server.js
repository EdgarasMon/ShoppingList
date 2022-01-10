const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

// Passport config
require('./passport-config')(passport);

// DB config
const dbURI = require('./config/keys').MongoURI;

// Connect to server
mongoose
	.connect(dbURI, { useNewUrlParser: true }, { useUnifiedTopology: true })
	.then(result => app.listen(3000), console.log('Server is running'))
	.catch(err => console.log(err));

app.use(express.static(path.join(__dirname, 'public')));
const viewpath = path.join(__dirname, 'public/views');
app.set('views', viewpath);
app.set('view engine', 'ejs');

//Bodyparser
app.use(bodyParser.urlencoded({ extended: false }));

//Express Session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true,
	})
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());
//console.log(app.use(passport.session()));

// Connect flash
app.use(flash());

// Global variables

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Routes
app.get('/', (req, res) => {
	res.render('index');
});
app.use('/', require('./public/views/routes'));
app.use('/login', require('./public/views/routes'));
app.use('/signup', require('./public/views/routes'));
app.use('/dashboard', require('./public/views/routes'));
app.use('/dashboard/:id', require('./public/views/routes'));
app.use('/My_Lists', require('./public/views/routes'));

//--404 page--
app.use((req, res) => {
	res.sendFile('public/404.html', { root: __dirname });
});
