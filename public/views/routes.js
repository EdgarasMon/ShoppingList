const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const passport = require('passport');
const router = express.Router();
const List = require('../../models/list');
const User = require('../../models/user');
const Products = require('../../models/products');
const passportConfig = require('../../passport-config');
const { ObjectId } = require('mongodb');
const cors = require('cors');

//--Routes--

router
	.route('/')
	.get((req, res) => {
		res.render('index');
	})
	.post((req, res) => {
		let newNote = new List({
			List: req.body.data2,
			User_id: req.body._id,
		});
	});

// Login
router
	.route('/login')
	.get((req, res) => {
		res.render('login');
	})
	.post((req, res, next) => {
		passport.authenticate('local', {
			successRedirect: 'dashboard',
			failureRedirect: 'login',
			failureFlash: true,
		})(req, res, next);
	});

// Sign-up

router
	.route('/signup')
	.get((req, res) => {
		res.render('signup');
	})
	.post(async (req, res) => {
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

// Log out
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', '* You are logged out');
	res.redirect('login');
});

// post List

router
	.route('/dashboard')
	.get(checkAuthenticated, (req, res) => {
		const User = req.user.User;
		res.render('dashboard', { User: User });
	})
	.post((req, res) => {
		let newNote = new List({
			List: req.body.data2,
			User_id: req.user._id,
		});
		if (req.body.data2 != null) {
			newNote.save();
		}
	});

// My_Lists

router.get('/My_Lists', checkAuthenticated, (req, res) => {
	const id = req.user._id;

	List.find({ User_id: id })
		.sort({ createdAt: -1 })
		.then(result => {
			res.render('My_Lists', { List: result });
		})
		.catch(err => {
			console.log(err);
		});
});

router.delete('/My_Lists/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);

	List.findByIdAndDelete(id)
		.then(result => {
			res.json({ redirect: '/My_Lists' });
		})
		.catch(err => {
			console.log(err);
		});
});

//app.use(cors());

router.get('/search', (req, res) => {
	const products = req.query.third;
	console.log(products);

	Products.find({ name: { $regex: products } })
		.then(result => {
			//res.json({ redirect: 'search', Products: result });
			//var data = JSON.result;
			//console.log(data);

			res.render('search', { Products: result, products: products });
			//res.json(data);
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

module.exports = router;
