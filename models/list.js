const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listShema = new Schema(
	{ List: String, User_id: String },
	{ timestamps: true }
);
const List = mongoose.model('List', listShema);

module.exports = List;
