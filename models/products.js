const { Int64, Double } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShemaProducts = new Schema({
	sku: String,
	name: String,
	type: String,
	price: String,
	upc: String,
	category: Array,
	Shipping: String,
	description: String,
	manufacturer: String,
	model: String,
	url: String,
	image: String,
});

const Products = mongoose.model('Products', ShemaProducts);

module.exports = Products;
