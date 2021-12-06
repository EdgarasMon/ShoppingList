var favorites = [];

document.getElementById('add').onclick = function changeContent() {
    document.getElementById('container2').style.display="block";
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('Qty').value;
    list.innerText += " * " + product;
    list.innerText += " " + productQty + "x" + "\n";    
    //create object
    var myObj = {
    "Product" : product,   
    "Qty" : productQty   
    }
    console.log("myobj", myObj);
    favorites.push(myObj);
    console.log("fav inside", favorites)        
}
    
    

console.log(JSON.stringify(favorites));

document.getElementById("save").onclick = function() {save()};

function save() {
    document.getElementById("save").innerHTML = "Saved";
    //localStorage.removeItem(product);
    //localStorage.removeItem(productQty);
    console.log("favorites in save", favorites);
    const btn = document.querySelector('save');
    document.getElementById('data2').innerHTML = JSON.stringify(favorites);

}


document.getElementById("clear").onclick = function() {clear()};
function clear() {
    document.getElementById('first').value='';
    document.getElementById('Qty').value='1';
    //localStorage.clear();
    //listStorage.clear();

}

document.getElementById("clear2").onclick = function() {clear2()};
function clear2() {
    list.innerText = "";

}

document.getElementById("addPaper").onclick = function() {addPaper()};
function addPaper() {
    var img = document.createElement("img");
    img.src = "/pic/paper2.jpg";
    var block = document.getElementById("container2");
    block.appendChild(img);
    document.getElementById("addPaper").remove();
}