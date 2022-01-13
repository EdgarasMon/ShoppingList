const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShemaUser = new Schema(
	{ User: String, password: String, email: String },
	{ timestamps: true }
);

const User = mongoose.model('User', ShemaUser);

module.exports = User;
