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

	let addedProduct = createProductAsObject(
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
		localStorage.setItem('savedProducts', null);
	}
})();

document.getElementById('save').onclick = () => {
	save();
};

function save() {
	document.getElementById('save').innerHTML = 'Saved';
	const btn = document.querySelector('save');
	document.getElementById('data2').innerHTML = JSON.stringify(productsList);
	console.log('saving');
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
	list.innerText = '';
	localStorage.clear('savedProducts');
}

document.getElementById('addPaper').onclick = () => {
	addPaper();
};

function addPaper() {
	var img = document.createElement('img');
	img.src = '/pic/paper3-2.jpg';
	var block = document.getElementById('container2');
	block.appendChild(img);
	document.getElementById('addPaper').remove();
}
