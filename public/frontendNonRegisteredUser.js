var favorites = [];

document.getElementById('add').onclick = function changeContent() {
	document.getElementById('container2').style.display = 'block';
	var product = document.getElementById('first').value;
	var productQty = document.getElementById('Qty').value;
	var weight = document.getElementById('weight').value;
	var units = document.getElementById('units').value;
	var price = document.getElementById('price').value;
	var currency = document.getElementById('currency').value;
	list.innerText += ' * ' + product;
	list.innerText += ' ' + productQty + 'x';
	list.innerText += ' ' + weight;
	if (weight != '') {
		list.innerText += ' ' + units;
	}
	list.innerText += ' ' + price;
	if (price != '') {
		list.innerText += ' ' + currency;
	}
	list.innerText += '\n';

	var myObj = {
		Product: product,
		Qty: productQty,
		weight: weight,
		units: units,
		price: price,
		currency: currency,
	};
	console.log('myobj', myObj);
	favorites.push(myObj);
	console.log('fav inside', favorites);
};

console.log(JSON.stringify(favorites));

document.getElementById('save').onclick = function () {
	save();
};

function save() {
	document.getElementById('save').innerHTML =
		'For saving Data please sign up';
	console.log('favorites in save', favorites);
	const btn = document.querySelector('save');
	//document.getElementById('data2').innerHTML = JSON.stringify(favorites);
}

document.getElementById('clear').onclick = function () {
	clear();
};
function clear() {
	document.getElementById('first').value = '';
	document.getElementById('Qty').value = '1';
	document.getElementById('weight').value = '';
	document.getElementById('units').value = '';
	document.getElementById('price').value = '';
	document.getElementById('currency').value = '';
}

document.getElementById('clear2').onclick = function () {
	clear2();
};
function clear2() {
	list.innerText = '';
}

document.getElementById('addPaper').onclick = function () {
	addPaper();
};
function addPaper() {
	var img = document.createElement('img');
	img.src = '/pic/paper3-2.jpg';
	var block = document.getElementById('container2');
	block.appendChild(img);
	document.getElementById('addPaper').remove();
}
