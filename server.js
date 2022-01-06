if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const ObjectId = require('mongodb').ObjectID;
const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const User = require('./models/user');
const List = require('./models/list');
const router = express.Router();

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

// Connect flash
app.use(flash());

// Global variables

app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error2 = req.flash('error2');
	next();
});

//--Routes--

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/signup', (req, res) => {
	res.render('signup');
});

app.get('/login', (req, res) => {
	res.render('login');
});

// Sign-up
app.post('/signup', async (req, res) => {
	const { name, password, password2, email } = req.body;
	const errors = [];

	if (!name || !password || !password2 || !email) {
		errors.push({ msg: '* Please fill in all fields' });
	}

	if (password !== password2) {
		errors.push({ msg: '* Passwords do not match' });
	}

	if (password.length < 6) {
		errors.push({ msg: '* Password should be min 6 characters' });
	}

	await User.findOne({ email: email }).then(User => {
		if (User) {
			//user exists
			errors.push({ msg: '* Email is already registered' });
		}
	});

	if (errors.length > 0) {
		res.render('signup', {
			errors,
			name,
			password,
			password2,
			email,
		});
	} else {
		try {
			// Hash password
			var hashedPassword = await bcrypt.hash(req.body.password, 10);
		} catch {
			res.redirect('/signup');
		}
		let newUser = new User({
			User: req.body.name,
			password: hashedPassword,
			email: req.body.email,
		});
		newUser.save();
		req.flash('success_msg', '* You are now registered and can log in');
		res.redirect('login');
	}
});

// Login
app.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: 'dashboard',
		failureRedirect: 'login',
		failureFlash: true,
	})(req, res, next);
});

// Log out
app.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', '* You are logged out');
	res.redirect('login');
});

// Non registered user
app.post('/', (req, res) => {});

// post List
app.post('/dashboard', (req, res) => {
	let newNote = new List({
		List: req.body.data2,
	});
	if (req.body.data2 != null) {
		newNote.save();
	}
});

app.get('/dashboard', checkAuthenticated, (req, res) =>
	res.render('dashboard', { User: req.user.User })
);

app.get('/My_Lists', (req, res) => {
	List.find()
		.sort({ createdAt: -1 })
		.then(result => {
			res.render('My_Lists', { List: result });
		})
		.catch(err => {
			console.log(err);
		});
});

app.delete('/My_Lists/:id', (req, res) => {
	const id = req.params.id;

	List.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/My_Lists' });
		})
		.catch(err => {
			console.log(err);
		});
});

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	req.flash('error_msg', '* Please log in to view this');
	res.redirect('login');
}

//--404 page--
app.use((req, res) => {
	res.sendFile('public/404.html', { root: __dirname });
});
