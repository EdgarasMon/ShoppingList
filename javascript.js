document.getElementById('add').onclick = function changeContent(){
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('second').value;
    console.log(product);
    console.log(productQty);
    container2.innerText += "New list :" + "\n";
    container2.innerText += " " + product + " ";
    container2.innerText += " " + productQty + "X";
}



