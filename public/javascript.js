document.getElementById('add').onclick = function changeContent(){
    document.getElementById('container2').style.display="block";
    var product = document.getElementById('first').value;
    var productQty = document.getElementById('Qty').value;
    //console.log("produkt", product, "Qty", Qty);
    list.innerText += " * " + product;
    list.innerText += " " + productQty + "x" + "\n";    
    //console.log(product, productQty);
    //localStorage.setItem("Product", product);
    //localStorage.setItem("product qty", productQty);
    // var obj = [];
    // localStorage.setItem('obj', JSON.stringify(obj));
    // var oldItems = JSON.parse(localStorage.getItem('obj')) || [];

    // var newItem = 
    // {
    // 'product': product,
    // 'productQty': productQty
    // };

    // oldItems.push(newItem);
    // localStorage.setItem('obj', JSON.stringify(oldItems));
    // console.log(localStorage);

        // Parse any JSON previously stored in allEntries
        var listStorage = localStorage;
        var existingEntries = JSON.parse(listStorage.getItem("allEntries"));
        if(existingEntries == null) existingEntries = [];
        var entry = {
            "product": product,
            "product qty": productQty
        };
        localStorage.setItem("entry", JSON.stringify(entry));
        // Save allEntries back to local storage
        existingEntries.push(entry);
        listStorage.setItem("allEntries", JSON.stringify(existingEntries));
        console.log(listStorage);

}

// export function sayLanguage() {
//     return listStorage;
//   }


document.getElementById("save").onclick = function() {save()};

function save() {
    document.getElementById("save").innerHTML = "Saved";
    localStorage.removeItem(product);
    localStorage.removeItem(productQty);
}

document.getElementById("clear").onclick = function() {clear()};
function clear() {
    document.getElementById('first').value='';
    document.getElementById('Qty').value='1';
    localStorage.clear();
    listStorage.clear();

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