
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

function refreshTotal(){
    let Total_compra=document.getElementById("Total_compra")
    Total_compra.innerHTML=""
    let n=(window.sessionStorage.length)/2
    let product
    let Total=0;
    for (let i=n; i>0; i--){
        product = JSON.parse(window.sessionStorage.getItem((i*2)-2))
        product.unit= parseInt(window.sessionStorage.getItem((i*2)-1))
        Total_compra.insertAdjacentHTML("afterbegin", '<label class="form-label"><b> · '+product.title+':</b>'+product.unit+'x $'+product.pricePerUnit+'</label><br>')
        Total += parseInt(product.unit) * parseInt(product.pricePerUnit)
    }
    Total_compra.insertAdjacentHTML("beforeend", '<hr>')
    Total_compra.insertAdjacentHTML("beforeend", '<label class="form-label"><h5><b>Total: '+Total+' MXN </b></h5></label>')
} 

refreshCart()
function refreshCart(){
    let cart = document.getElementById('cart')
    let n=(window.sessionStorage.length)/2
    let product
    
    cart.innerHTML=""
    for (let i=n; i>0; i--){
        product = JSON.parse(window.sessionStorage.getItem((i*2)-2))
        let button_done='<span hidden id="'+product.uuid+'_btn_done"class="input-group-text" role="button" onclick=button_done('+((i*2)-2)+') style="background-color:rgb(32, 156, 32);" ><i class="fa-solid fa-check"></i></a></span>'
        let button_x='<span hidden id="'+product.uuid+'_btn_x" class="input-group-text" role="button" onclick=button_x('+((i*2)-2)+') style="background-color:rgb(212, 54, 54);" ><i class="fa-solid fa-xmark"></i></a></span>'
        let button_pen='<span id="'+product.uuid+'_btn_pen" class="input-group-text" role="button" onclick=button_pen('+((i*2)-2)+') style="background-color:rgb(54, 144, 239);" ><i class="fa-solid fa-pen"></i></a></span>'
        cart.insertAdjacentHTML("afterbegin",
        '<div id="'+(((i*2)-2)+"_sessionStorageID")+'"><div class="media border p-3"><div class="media-body"><div class="row"><div class="col-8 "><h2><a class="btn btn-danger align-right" role="button" onclick=removeProduct('+((i*2)-2)+')><i class="fa-solid fa-trash"></i></a>  '+
            product.title +'</h2><small><i>'+
            product.description+' / '+product.category+'</i></small><div class="input-group mt-4"><span class="input-group-text">Cantidad: </i></span><input disabled id="'+
            (((i*2)-2)+"_input")+'"type="number" min=1 max='+parseInt(product.stock)+' class="form-control" onkeydown=onInputEnter(event,'+((i*2)-2)+')  value="'+
        parseInt(window.sessionStorage.getItem((i*2)-1))+'" placeholder="0">'+button_done+button_x+button_pen+'</div><div class="input-group mt-2"><span class="input-group-text">Precio: </i></span><input type="number" disabled class="form-control" value="'+
        product.pricePerUnit+'"><span class="input-group-text">MXN </i></span></div></div><div class="col-3 " style="text-align: right;"><img src="'+
        product.imageUrl+'" alt="'+product.title+'" class="ml-3 mt-3 rounded" style="width:10ch;"></div></div></div></div> </div>')
    }
    refreshTotal()
}

function onInputEnter(event,StorageID){
    if(event.key === "Enter") button_done(StorageID)
}

function removeProduct(StorageID){
    let cart_list = []
    for (let i = 0; i <window.sessionStorage.length; i++) {
        cart_list[i] = JSON.parse(window.sessionStorage.getItem(i))
    }
    cart_list.splice(StorageID,2)
    //console.log(cart_list)
    window.sessionStorage.clear()
    for (let i = 0; i <cart_list.length; i++) {
        window.sessionStorage.setItem(i,JSON.stringify(cart_list[i]))
    }
    refreshCart();
    refreshShopping_cart_icon()
}

function button_done(StorageID){
    let input = document.getElementById(StorageID+'_input')
    if (input.value<=parseInt(JSON.parse(window.sessionStorage.getItem(StorageID)).stock) && input.value>0){
        input.disabled=true
        document.getElementById('Pagar_btn').disabled=false
        window.sessionStorage.setItem(StorageID+1, input.value)
        refreshTotal()
        changeProduct(StorageID)
    }
}

function pagar(){
    let allow=true
    if (window.sessionStorage.length==0){alert("No hay compras pendientes"); return}
    for (let i=0; i<window.sessionStorage.length/2; i++){
        let input = document.getElementById(((i*2))+'_input')
        allow= (allow && input.disabled)
    }
    if (allow) {
        alert('pagando...')
        window.sessionStorage.clear()
        refreshCart();
        refreshShopping_cart_icon();
    }
    else {
        alert("Confirma las cantidades!!!!");
        console.log("not allowed")
    }
}

function cancelar(){
    window.sessionStorage.clear()
    refreshCart();
    refreshShopping_cart_icon();
}

function button_x(StorageID){
    let input = document.getElementById(StorageID+'_input')
    input.disabled=true
    input.value=window.sessionStorage.getItem(StorageID+1)
    changeProduct(StorageID)
}

function button_pen(StorageID){
    let input = document.getElementById(StorageID+'_input')
    input.disabled=false
    changeProduct(StorageID)
}

function changeProduct(StorageID){
    let input = document.getElementById(StorageID+'_input')
    input.nextSibling.hidden=!input.nextSibling.hidden
    input.nextSibling.nextSibling.hidden = !input.nextSibling.nextSibling.hidden
    input.nextSibling.nextSibling.nextSibling.hidden= !input.nextSibling.nextSibling.nextSibling.hidden
}
    