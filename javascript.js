document.getElementById('add').onclick = function changeContent(){
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('second').value;
    //console.log(product);
    //console.log(productQty);
    //localStorage.setItem(product, productQty);
    
    //container2.innerText += "New list :" + "\n";
    //container2.innerText += localStorage.getItem();
    //container2.innerText += " " + productQty + "X";
    //console.log(localStorage);
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);        
        container2.innerText += key + "\t";
        container2.innerText += value + "X";
        container2.innerText += "\n";
    }
    document.getElementById('first').value='';
    document.getElementById('second').value='';
    document.reload();

}



