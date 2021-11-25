document.getElementById('add').onclick = function changeContent(){
    document.getElementById('container2').style.display="block";
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('Qty').value;
    list.innerText += " * " + product;
    list.innerText += " " + productQty + "x" + "\n";    
    localStorage.setItem("Product", product);
    localStorage.setItem("product qty", productQty);
    var stor = localStorage.getItem("Product", product, "product qty", productQty); 
    console.log(stor);  
    document.getElementById('first').value='';
    document.getElementById('Qty').value='1';
}

document.getElementById("save").onclick = function() {save()};
function save() {
document.getElementById("save").innerHTML = "Saved";
}

document.getElementById("clear").onclick = function() {clear()};
function clear() {
list.innerText = "";

}