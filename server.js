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
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');

app.use(express.static(path.join(__dirname, 'public')));
const viewpath = path.join(__dirname, 'public/views');
app.set('views', viewpath);
app.set('view engine', 'ejs');

const Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const dbURI = require('./config/keys').MongoURI;

mongoose
	.connect(dbURI, { useNewUrlParser: true }, { useUnifiedTopology: true })
	.then(result => app.listen(3000), console.log('Server is running'))
	.catch(err => console.log(err));

//--Schemas and Models--

const listShema = new Schema({ List: String }, { timestamps: true });

const listShemaUser = new Schema(
	{ User: String, password: String, email: String },
	{ timestamps: true }
);

const List = mongoose.model('List', listShema);
const User = mongoose.model('User', listShemaUser);

// Passport

const initializePassport = require('./passport-config');
initializePassport(passport, email => {
	users.find(User => User.email === email),
		id => Users.find(User => User.id === id);
});

//--Routes--

app.get(
	'/',
	/*checkAuthenticated,*/ function (req, res) {
		res.render('index');
	}
);

app.get(
	'/signup',
	/*checkAuthenticated,*/ function (req, res) {
		res.render('signup');
	}
);

app.get('/login', checkNotAuthenticated, function (req, res) {
	res.render('login');
});

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/index2',
		failureMessage: '/login',
		failureFlash: true,
	})
);

// Sign-up
app.post(
	'/signup',
	/*checkNotAuthenticated,*/ async (req, res) => {
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
			res.redirect('login');
		}
	}
);

app.post('/', (req, res) => {
	let newNote = new List({
		List: req.body.data2,
	});
	if (req.body.data2 != null) {
		newNote.save();
	}
});

app.get('/index2', (req, res) => {
	User.find()
		.sort({ createdAt: -1 })
		.then(result => {
			res.render('index2', { User: result });
		})
		.catch(err => {
			console.log(err);
		});
});

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

app.delete('/logout', (req, res) => {
	req.logout();
	res.redirect('/login');
});

function checkAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/');
	}
	next();
}

// //--404 page--
// app.use((req, res) => {
// 	res.sendFile('public/404.html', { root: __dirname });
// });
