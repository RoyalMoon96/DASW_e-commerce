console.log("Se cargo el js shopping_cart");
class ShoppingCartException{
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}


class ShoppingCart{
    static proxies=[];
    static productos=[];
    static addItem(productUuid, amount){
        for (let item in this.proxies){
            if (this.proxies[item].uuid==productUuid){
                this.proxies[item].cantidad+=amount;
                return ;
            }
        }
        this.proxies.push(new ProductProxy(productUuid, amount));
        return ;
    }


    static updateItem(productUuid, newAmount){
        if (newAmount<0) 
            throw new ShoppingCartException("the Amount is negative");
        for (let item in this.proxies){
            if (this.proxies[item].uuid==productUuid){
                this.proxies[item].cantidad=newAmount;
                if (newAmount==0)
                    this.proxies.splice(item, 1);
                return true;
            }
        }
        throw new ShoppingCartException("the productUuid isnt in the ShoppingCart");
    }

    static removeItem(productUuid){
        for (let item in this.proxies){
            if (this.proxies[item].uuid==productUuid){
                this.proxies.splice(item, 1);
                return true;
            }
        }
        throw new ShoppingCartException("the productUuid isnt in the ShoppingCart");

    }

    static calculateTotal(){
        let sum=0;
        for (let item in this.proxies){
            let product= getProductById(this.proxies[item].uuid)
            let precio = product.pricePerUnit;
            console.log("Juego: "+product.title+" precio: " + precio, " cantidad: "+ this.proxies[item].cantidad);
            sum+=(this.proxies[item].cantidad)*precio;
        }
        return sum;
    }
}

class ProductProxy{
    constructor(uuid,cantidad){
        this.uuid=uuid;
        this.cantidad=cantidad;
    }
} 

module.exports = ShoppingCart;

