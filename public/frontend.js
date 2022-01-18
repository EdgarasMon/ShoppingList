var productsList = [];

showMyListElement = () => {
	document.getElementById('container2').style.display = 'block';
	document.getElementById('grocery').style.display = 'none';
};

addProduct = () => {
	showMyList();

	var productName = document.getElementById('first').value;
	var productQty = document.getElementById('Qty').value;
	var productWeight = document.getElementById('weight').value;
	var productUnits = document.getElementById('units').value;
	var productPrice = document.getElementById('price').value;
	var productCurrency = document.getElementById('currency').value;

	list.innerText += ' * ' + productName;
	list.innerText += ' ' + productQty + 'x';
	list.innerText += ' ' + productWeight;

	if (productWeight != '') {
		list.innerText += ' ' + productUnits;
	}
	list.innerText += ' ' + productPrice;
	if (productPrice != '') {
		list.innerText += ' ' + productCurrency;
	}
	list.innerText += '\n';

	var addedProduct = createProductAsObject(
		productName,
		productQty,
		productWeight,
		productUnits,
		productPrice,
		productCurrency
	);

	addProductToLocalStorage(addedProduct);
};

createProductAsObject = (
	name,
	qty = 1,
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

addProductToLocalStorage = product => {
	productsList.push(product);

	var currentAddedProducts = localStorage.getItem('favedProducts');
	localStorage.setItem(
		'favedProducts',
		JSON.stringify(JSON.parse(currentAddedProducts).concat(productsList))
	);
	// TODO - reset productsList array
};

getProductsFromLocalStorage = () => {
	// TODO - get frrom local storage
	console.log('getProductsFromLocalStorage productsList ', productsList);
};

(function () {
	if (productsList != null) {
		showMyListElement();
		getProductsFromLocalStorage();
	}
})();

document.getElementById('save').onclick = () => {
	save();
};

function save() {
	document.getElementById('save').innerHTML = 'Saved';
	const btn = document.querySelector('save');
	document.getElementById('data2').innerHTML = JSON.stringify(favorites);
	document.getElementById('id').innerHTML = JSON.stringify(favorites);
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

// document.getElementById('addfromdatabase').onclick = () => {
// 	addfromdatabase();
// };

// function addfromdatabase() {
// 	console.log('click');
// }
