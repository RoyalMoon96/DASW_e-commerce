let products=[]

refreshProducts()
function refreshProducts(){
    console.log("consultando productos...");
    let xhr = new XMLHttpRequest();
    xhr.open("GET","http://localhost:3000/Products");
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            products = JSON.parse(xhr.responseText)
            console.log("Leido: ", products);
            let box = document.getElementById('ScrollBox')
            box.innerHTML="<h2>(ScrollBox) Productos: </h2>"
            for (let i = 0; i < products.length; i++){
                    let img = ""+products[i].imageUrl;
                    let uuid = products[i].uuid;
                    let title = products[i].title;
                    let description = products[i].description;
                    let category = products[i].category;
                    let precio = products[i].pricePerUnit;
                    let unit = products[i].unit;
                    let stock = products[i].stock;
                    console.log(products[i])
                    box.insertAdjacentHTML("beforeend",'<div id="Product_'+i+""+'"><div class="media border p-3"><div class="media-body"><div class="row"><div class="col-8 "><h2>'+
                    title +'</h2><small><i> uuid: '+
                    uuid+'<br>'+description+' /'+category+' / $'+precio+'<br> unit: '+unit+' / stock: '+stock+'</i></small></div><div class="col-3 " style="text-align: right;"><img src="'+
                    img+'" alt="'+title+'" class="ml-3 mt-3 rounded" style="width:10ch;"></div></div></div></div> </div>')
                }
            return products
    }
} 
}

function Create(){
    let title = document.getElementById('Product_Title').value;
    let description = document.getElementById('Product_Description').value;
    let imageUrl = document.getElementById('Product_ImageUrl').value;
    let stock = document.getElementById('Product_Stock').value;
    let price = document.getElementById('Product_PricePerUnit').value;
    let category = document.getElementById('Product_Category').value;
    if (title==""|| imageUrl==""|| stock<=0 || price<=0) return
    let product = [{"uuid":generateUUID(),
    "title":title,
    "description":description,
    "imageUrl": imageUrl,
    "unit": 1,
    "stock":stock,
    "pricePerUnit":price,
    "category":category
    }]
    guardarJSON(product,"http://localhost:3000/admin/products","POST")
    refreshProducts()
}
function Modify(){
    let uuid = document.getElementById('Product_Uuid').value;
    if (products.find(function(product){return product.uuid == uuid})==null)return
    else {
        console.log("Modificando...")
        let title = document.getElementById('Product_Title').value;
        let description = document.getElementById('Product_Description').value;
        let imageUrl = document.getElementById('Product_ImageUrl').value;
        let stock = document.getElementById('Product_Stock').value;
        let price = document.getElementById('Product_PricePerUnit').value;
        let category = document.getElementById('Product_Category').value;
        if (title==""|| imageUrl==""|| stock<=0 || price<=0) return
        let product = [{"uuid":uuid,
        "title":title,
        "description":description,
        "imageUrl": imageUrl,
        "unit": 1,
        "stock":stock,
        "pricePerUnit":price,
        "category":category
        }]
        console.log(uuid)
        guardarJSON(product,("http://localhost:3000/admin/products/"+uuid),"PUT")

    }
}

function Delate(){
    let uuid = document.getElementById('Product_Uuid').value;
    if (uuid==null)return
    else {
        console.log("Eliminando...")
        console.log(uuid)
        guardarJSON(undefined,("http://localhost:3000/admin/products/"+uuid),"DELETE")

    }
}

function OptionDelate(){
    let uuid = document.getElementById('Product_Uuid');
    uuid.disabled= false;
    uuid.value= "";
    let btn_do = document.getElementById('btn_do');
    btn_do.onclick= Delate
    btn_do.innerText="Delate"
    let title = document.getElementById('Product_Title');
    let description = document.getElementById('Product_Description');
    let imageUrl = document.getElementById('Product_ImageUrl');
    let stock = document.getElementById('Product_Stock');
    let price = document.getElementById('Product_PricePerUnit');
    let category = document.getElementById('Product_Category');
    title.disabled= true;
    description.disabled= true;
    imageUrl.disabled= true;
    stock.disabled= true;
    price.disabled= true;
    category.disabled= true;
}

function OptionCreate(){
    let uuid = document.getElementById('Product_Uuid');
    uuid.disabled= true;
    uuid.value= "";
    let btn_do = document.getElementById('btn_do');
    btn_do.onclick= Create
    btn_do.innerText="Create"
    let title = document.getElementById('Product_Title');
    let description = document.getElementById('Product_Description');
    let imageUrl = document.getElementById('Product_ImageUrl');
    let stock = document.getElementById('Product_Stock');
    let price = document.getElementById('Product_PricePerUnit');
    let category = document.getElementById('Product_Category');
    title.disabled= false;
    description.disabled= false;
    imageUrl.disabled= false;
    stock.disabled= false;
    price.disabled= false;
    category.disabled= false;
}

function OptionModify(){
    let uuid = document.getElementById('Product_Uuid');
    uuid.disabled= false;
    uuid.value= "";
    let btn_do = document.getElementById('btn_do');
    btn_do.onclick= Modify
    btn_do.innerText="Modify"
    let title = document.getElementById('Product_Title');
    let description = document.getElementById('Product_Description');
    let imageUrl = document.getElementById('Product_ImageUrl');
    let stock = document.getElementById('Product_Stock');
    let price = document.getElementById('Product_PricePerUnit');
    let category = document.getElementById('Product_Category');
    title.disabled= false;
    description.disabled= false;
    imageUrl.disabled= false;
    stock.disabled= false;
    price.disabled= false;
    category.disabled= false;
}

function generateUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r =Math.random()*16|0;
        let v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function guardarJSON(product,urlJSON,method){
    let xhr = new XMLHttpRequest();
    xhr.open(method,urlJSON);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("x-auth", "admin");
    xhr.send(JSON.stringify(product));
    xhr.onload = function (){
        /* if (xhr.status != 200 && xhr.status != 201) {
            alert(xhr.status + ": " + xhr.statusText);
            refreshProducts()
        } else{ */
            console.log( xhr.responseText);
            refreshProducts()
        /* } */
    }
}