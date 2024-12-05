 console.log("Se cargo el js products");


 class ProductException {
    constructor(errorMessage) {
        this.errorMessage = errorMessage;
    }
}


class Product {
    constructor(uuid, title, description, imageUrl, unit, stock, pricePerUnit, category) {
        if (uuid==undefined||uuid==null)
            this._uuid = generateUUID();
        else 
            this._uuid = uuid;
        this._title = title;
        this._description = description;
        this._imageUrl = imageUrl;
        this._unit = unit;
        this._stock = stock;
        this._pricePerUnit = pricePerUnit;
        this._category = category;
    }

    // Evitamos que se pueda modificar el UUID después de la creación
    set uuid(value) {
        throw new ProductException("Product uuids are auto-generated");
    }

    set title(value) {
        if (value === "") {
            throw new ProductException("Product title can't be empty");
        }
        this._title = value;
    }

    set description(value) {
        if (value === "") {
            throw new ProductException("Product description can't be empty");
        }
        this._description = value;
    }

    set imageUrl(value) {
        if (value === "") {
            throw new ProductException("The product needs an imageUrl");
        }
        this._imageUrl = value;
    }

    set unit(value) {
        if (value === "") {
            throw new ProductException("The product needs a unit value");
        }
        this._unit = value;
    }

    set stock(value) {
        if (value < 0 || typeof value === "string") {
            throw new ProductException("The stock can't be below 0");
        }
        this._stock = value;
    }

    set pricePerUnit(value) {
        if (value < 0) {
            throw new ProductException("The pricePerUnit can't be below 0");
        }
        this._pricePerUnit = value;
    }

    set category(value) {
        if (value === "") {
            throw new ProductException("The product needs a category");
        }
        this._category = value;
    }

    // Resto de los getters...
    get uuid() {
        return this._uuid;
    }

    get title() {
        return this._title;
    }

    get description() {
        return this._description;
    }

    get imageUrl() {
        return this._imageUrl;
    }

    get unit() {
        return this._unit;
    }

    get stock() {
        return this._stock;
    }

    get pricePerUnit() {
        return this._pricePerUnit;
    }

    get category() {
        return this._category;
    }

    static createFromJson(json) {
        const data = JSON.parse(json);
        return new Product(data.uuid, data.title, data.description, data.imageUrl, data.unit, data.stock, data.pricePerUnit, data.category);
    }
    static cleanObject(object) {
        const validProperties = ['_uuid', '_title', '_description', '_imageUrl', '_unit', '_stock', '_pricePerUnit', '_category'];

        for (const key in object) {
            if (!validProperties.includes(key)) {
                delete object[key];
            }
        }   
    }
        
    static createFromObject(object) {
        Product.cleanObject(object);
        console.log(object);
        return new Product(object.uuid, object.title, object.description, object.imageUrl, object.unit, object.stock, object.pricePerUnit, object.category);
    }
}

module.exports = Product;