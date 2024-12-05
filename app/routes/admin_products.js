const express = require('express');
const router = express.Router();
const data_handler = require('../controllers/data_handler');


/* 
function createProduct_AdminP(object){
    if(object.title === undefined || object.description === undefined ||
        object.imageUrl === undefined || object.unit === undefined ||
        object.stock === undefined || object.pricePerUnit === undefined ||
        object.category === undefined || object.category === undefined)
            return res.status(400).json({ 
                error: 'bad request'
                });
    data_handler.createProduct(object);
} */

router.post('/', (req, res) => {
    if (!Array.isArray(req.body)) 
        return res.status(400).json({ 
                error: 'El body debe ser un arreglo.'
                });
    else 
        //(req.body).forEach(object => {
        for (let object in req.body){
                if(req.body[object].title == undefined || req.body[object].description == undefined ||
                    req.body[object].imageUrl == undefined || req.body[object].unit == undefined ||
                    req.body[object].stock == undefined || req.body[object].pricePerUnit == undefined ||
                    req.body[object].category == undefined || req.body[object].uuid == undefined)
                        return res.status(400).json({ 
                            error: 'bad request'
                            });
                if (!data_handler.createProduct(req.body[object])) return res.status(400).json({ 
                                                                            error: 'bad request the product already exists'
                                                                            });
        };
    let titles="";
    for (let object in req.body){
        if (object >0)
            titles = titles+", "+req.body[object].title;
        else titles = req.body[object].title;
    }
    res.set("Content-Type", "application/json");
    res.status(201);
    res.send(JSON.stringify(titles));
});


router.put('/:id', (req, res) => {
    console.log('modificando products by ID');
    let ID=req.params.id;
    let product = data_handler.getProductById(ID)
    if (product == null) return res.status(404).json({ 
        error: 'No se encontró el producto '
    }); 
    product= req.body[0]
    if(product.title == undefined || product.description == undefined ||
        product.imageUrl == undefined || product.unit == undefined ||
        product.stock == undefined || product.pricePerUnit == undefined ||
        product.category == undefined || product.uuid == undefined)
        return res.status(400).json({ 
            error: 'bad request. the atributes dosnt match'
        });
    data_handler.updateProduct(ID, product)
    //console.log(product)
        res.set("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(product.title));
})


router.delete('/:id', (req, res) => {
    console.log('eliminando producto by ID');
    let ID=req.params.id;
    let product = data_handler.getProductById(ID);
    if (product == null) return res.status(404).json({ 
        error: 'No se encontró el producto '
    }); 
    data_handler.deleteProduct(ID)
    console.log("Se elimino el producto: ",product)
        res.set("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(product.title));
})


module.exports = router;

