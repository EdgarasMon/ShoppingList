createProductAsObject = (
	name,
	qty,
	weight = null,
	units = null,
	price = null,
	currency = '$'
) => {
	return (Product = {
		name,
		qty,
		weight,
		units,
		price,
		currency,
	});
};

showProductsListElement = () => {
	document.getElementById('container2').style.display = 'block';
	document.getElementById('grocery').style.display = 'none';
};

addProductEnteringDescription = () => {
	let name = document.getElementById('name').value;
	let qty = document.getElementById('qty').value;
	let weight = document.getElementById('weight').value;
	let units = document.getElementById('units').value;
	let price = document.getElementById('price').value;
	let currency = document.getElementById('currency').value;

	showProductsListElement();

	list.innerText += ' * ' + name;
	list.innerText += ' ' + qty + 'X';
	list.innerText += ' ' + weight;

	if (weight != '') {
		list.innerText += ' ' + units;
	}
	list.innerText += ' ' + price;
	if (price != '') {
		list.innerText += ' ' + currency;
	}
	list.innerText += '\n';

	var addedProduct = createProductAsObject(
		name,
		qty,
		weight,
		units,
		price,
		currency
	);

	addProductToLocalStorage(addedProduct);
};

displayProductFromLocalStorage = name => {
	let qty = 1;

	showProductsListElement();

	list.innerText += ' * ' + name;
	list.innerText += ' ' + qty + 'X';
	list.innerText += '\n';
};

getProductsFromLocalStorage = () => {
	let currentAddedProducts = localStorage.getItem('savedProducts');
	let parsedCurrentAddedProducts = JSON.parse(currentAddedProducts);

	for (var i = 0; i < parsedCurrentAddedProducts.length; i++) {
		displayProductFromLocalStorage(parsedCurrentAddedProducts[i].name);
	}
};

addProductToLocalStorage = product => {
	products = JSON.parse(localStorage.getItem('savedProducts'));
	products.push(product);
	localStorage.setItem('savedProducts', JSON.stringify(products));
};

(() => {
	if (localStorage.getItem('savedProducts') != null) {
		getProductsFromLocalStorage();
		showProductsListElement();
	} else {
		localStorage.setItem('savedProducts', '[]');
	}
})();

document.getElementById('save').onclick = () => {
	save();
};

function save() {
	document.getElementById('info').innerHTML = '';
	document.getElementById('info').style.display = 'block';
	document.getElementById('info').innerHTML += '* List was saved ';
	document.getElementById('info').innerHTML +=
		'<button id="close" style="float: right; font-weight: bold;" onclick="closeInfoDiv()">X</button>';
	const btn = document.querySelector('save');
	products = JSON.parse(localStorage.getItem('savedProducts'));
	document.getElementById('data2').innerHTML = JSON.stringify(products);
}

document.getElementById('clear').onclick = () => {
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

document.getElementById('clear2').onclick = () => {
	clear2();
};
function clear2() {
	document.getElementById('info').innerHTML = '';
	document.getElementById('info').style.display = 'block';
	document.getElementById('info').innerHTML += '* List was cleared ';
	document.getElementById('info').innerHTML +=
		'<button id="close" style="float: right; font-weight: bold;" onclick="closeInfoDiv()">X</button>';
	list.innerText = '';
	localStorage.clear('savedProducts');
}
function addPaper() {
	document.getElementById('info').innerHTML = '';
	document.getElementById('info').style.display = 'block';
	document.getElementById('info').innerHTML += '* Papper was added ';
	document.getElementById('info').innerHTML +=
		'<button id="close" style="float: right; font-weight: bold;" onclick="closeInfoDiv()">X</button>';
	var img = document.createElement('img');
	img.src = '/pic/paper3-2.jpg';
	var block = document.getElementById('container2');
	block.appendChild(img);
	document.getElementById('addPaper').remove();
}

closeInfoDiv = () => {
	document.getElementById('info').style.display = 'none';
};
