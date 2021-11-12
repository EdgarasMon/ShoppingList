document.getElementById('add').onclick = function changeContent(){
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('second').value;

    container2.innerText += product;
    container2.innerText += " " + productQty + "X" + "\n";    
    console.log(localStorage);  
}



