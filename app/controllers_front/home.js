let url= "http://localhost:3000/Products"
let urlCart= "http://localhost:3000/products/cart"
let products;
let productsInPage=4;

function controller_button_Pag(){
    let current;
    let Buttons_list = document.getElementById("Buttons_list").children;
    for (let i = 0; i < Buttons_list.length; i++ ){
        Buttons_list[i].addEventListener("click", function() {
            for (let i = 0; i < Buttons_list.length; i++ ){
                if (Buttons_list[i].class=="page-item active"){
                    current=Buttons_list[i];
                    Buttons_list[i].class="page-item";
                }
            }
            if (i==0)
            getProducts(0);
        else if (i==Buttons_list.length-1)
            getProducts(-1);
        else if (Buttons_list[i].getAttribute("number")>=0)
        getProducts(Buttons_list[i].getAttribute("number")-1);
    Buttons_list[i].class="page-item active"
});
}
}

function setButton_list(PagNumber){
    let Buttons_list=document.getElementById("Buttons_list")
    Buttons_list.innerHTML=""
    
    let No_pages=Math.ceil(products.length/productsInPage)
    console.log(Buttons_list);
    for (let j=0; j<=No_pages+1; j++){
        if (j==0)
            Buttons_list.insertAdjacentHTML("beforeend",'<li class="page-item" number="-1"><a class="page-link" href="#" aria-label="Previous" ><span aria-hidden="true">&laquo;</span></a></li>')
        else if (j==No_pages+1)
            Buttons_list.insertAdjacentHTML("beforeend",'<li class="page-item" number="-2"><a class="page-link" href="#" aria-label="Next" ><span aria-hidden="true">&raquo;</span></a></li>')
        else if (j==PagNumber+1)
            Buttons_list.insertAdjacentHTML("beforeend",'<li id="button_Pag'+j+'" class="page-item active" number="'+j+'" aria-current="page"><a class="page-link" href="#" >'+j+'</a> </li>')
        else
            Buttons_list.insertAdjacentHTML("beforeend",'<li id="button_Pag'+j+'" class="page-item" number="'+j+'" aria-current="page"><a class="page-link" href="#" >'+j+'</a> </li>')
    }
    controller_button_Pag()
}


getProducts(0)
function getProducts(PagNumber){
    let Inicio = PagNumber* productsInPage
    let Final = Inicio + productsInPage
    if (PagNumber ==-1) {
        Final=products.length
        Inicio=Final-4
    }
    console.log("consultando productos...", Inicio,Final);
    let xhr = new XMLHttpRequest();
    xhr.open("GET",url);
    xhr.send();
    xhr.onload = function (){
        if (xhr.status != 200) {
            alert(xhr.status + ": " + xhr.statusText);
        } else{
            products = JSON.parse(xhr.responseText)
            console.log("Leido: ", products);
            if (products==undefined||products==null) return;
            let box = document.querySelector("#product-box")
            box.innerHTML=""
            if (PagNumber ==-1) {
                Final=productsInPage*Math.ceil(products.length/productsInPage)
                Inicio=Final-4
            }
            if (products.length<Final) Final= products.length;
            for (let i = Inicio; i < Final; i++){
                    let img = ""+products[i].imageUrl;
                    let title = products[i].title;
                    let description = products[i].description;
                    let category = products[i].category;
                    let precio = products[i].pricePerUnit;
                    //console.log(i+": "+products[i]);
                    box.insertAdjacentHTML('afterbegin','<div id="card_'+i+'" class="card col-lg-3 col-md-4 col-sm-6 col-6 mt-2 ml-2"><img class="card-img-top" src="'+
                    img+'"<div class="card-body"><h4 class="card-title" >'+title+'</h4><p class="card-text" >'+description+" / "+category+'</p><hr><table><tr><th>$'+precio+'</th><th style="width: 70%;"><button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modal_Add_to_cart">Add to cart</button></th><tr></table><br></div>')
                    document.getElementById("card_"+i).addEventListener('click',function(){changemodal(products[i])} );
                }
            setButton_list(PagNumber)
            return products
    }
} 
}

refreshShopping_cart_icon()
function refreshShopping_cart_icon(){
    let shopping_cart_icon=document.querySelector("#collapsibleNavId > a:nth-child(3)")
    if (window.sessionStorage.length==0){
        shopping_cart_icon.innerHTML='<i class="fa-solid fa-cart-shopping"></i>'
    }
    else{
        let items=0;
        let n=(window.sessionStorage.length)/2
        for (let i=n; i>0; i--){
            items += parseInt(window.sessionStorage.getItem((i*2)-1))
        }
        //console.log("items in cart: ",items);
        shopping_cart_icon.innerHTML='<i class="fa-solid fa-cart-shopping"></i><span class="badge bg-warning rounded-pill" >'+items+'</span>'
    } 
}

function changemodal(product){
    let modal_TitleId=document.getElementById("modal_Add_to_cartTitleId")
    let modal_TotalPrice=document.getElementById("modal_TotalPrice")
    let modal_input_units=document.getElementById("modal_input_units")
    let modal_subtitle=document.getElementById("modal_subtitle")
    let modal=document.getElementById("modal_Add_to_cart")
    modal.setAttribute("uuid",product.uuid)
    modal_input_units.value=1
    modal_input_units.max=product.stock
    modal_subtitle.innerText="Units "+modal_input_units.value+"/"+product.stock
    modal_TitleId.innerText="Add to Cart: "+product.title
    modal_TotalPrice.innerText= modal_input_units.value+"X $"+product.pricePerUnit+" = $"+(modal_input_units.value*product.pricePerUnit)
    modal_input_units.addEventListener("Enter",function(){
        AddToCart()
    })
    modal_input_units.addEventListener("change",function(){
        modal_subtitle.innerText="Units "+modal_input_units.value+"/"+product.stock
        modal_TotalPrice.innerText= modal_input_units.value+"X $"+product.pricePerUnit+" = $"+(modal_input_units.value*product.pricePerUnit)
    })
}
function onInputEnter(event){
    if(event.key === "Enter") AddToCart()
}

function AddToCart(){
    let modal_input_units=document.getElementById("modal_input_units")
    let modal=document.getElementById("modal_Add_to_cart")
    let product_id=modal.getAttribute("uuid")
    let value= parseInt(modal_input_units.value)
    product=products.find(product => product.uuid == product_id);
    if (value <= parseInt(product.stock) && value>0)
    {
        window.sessionStorage.setItem(window.sessionStorage.length, JSON.stringify(product))
        window.sessionStorage.setItem(window.sessionStorage.length, value)
        refreshShopping_cart_icon()
        console.log("El storage es: ",window.sessionStorage) 
        document.getElementById("modal_Add_to_cart_close_btn").click()
    }
}
