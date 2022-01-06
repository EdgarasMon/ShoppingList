const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('./models/user');

module.exports = passport => {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email' },
			(email, password, done) => {
				User.findOne({ email: email })
					.then(User => {
						if (!User) {
							return done(null, false, {
								message: '* that email ir not registered',
							});
						}
						bcrypt.compare(
							password,
							User.password,
							(err, isMatch) => {
								if (err) throw err;

								if (isMatch) {
									return done(null, User);
								} else {
									return done(null, false, {
										message: '* Password incorrect',
									});
								}
							}
						);
					})
					.catch(err => console.log(err));
			}
		)
	);
	passport.serializeUser((User, done) => {
		done(null, User.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (err, User) => {
			done(err, User);
		});
	});
};
