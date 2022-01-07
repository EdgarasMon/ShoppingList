const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const router = express.Router();
const List = require('../../models/list');
const User = require('../../models/user');

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
	.get(
		checkAuthenticated,
		(req, res) => res.render('dashboard', { User: req.user.User })
		// .params("id", (req, res, next) {
		// 	User.findById(id, (req, res, next, id) => {
		// 		if (err) {
		// 			res.json(err);
		// 		} else {
		// 			res.render('dashboard', { User: id });
		// 			next();
		// 		}
		// 	})
		// 	})
	)
	.post((req, res) => {
		let newNote = new List({
			List: req.body.data2,
			User_id: req.body._id,
		});
		if (req.body.data2 != null) {
			newNote.save();
			console.log(req.body.data2);
			console.log(req.body.id);
		}
	});

// My_Lists

router.get('/My_Lists', (req, res) => {
	List.find()
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

module.exports = router;
