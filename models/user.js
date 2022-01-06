const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listShemaUser = new Schema(
	{ User: String, password: String, email: String },
	{ timestamps: true }
);

const User = mongoose.model('User', listShemaUser);

module.exports = User;
