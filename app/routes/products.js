const express = require('express');
const router = express.Router();
const data_handler = require('../controllers/data_handler');


router.get('/', (req, res) => {
    console.log('Consultando products');
    products = data_handler.getProducts()
    var q = req.url.split('?')[1];
    //console.log(q);
    products = data_handler.findProduct(products,q);
    //console.table(products);
    res.send(products);
})

router.post('/cart', (req, res) => {
    console.log("se recibio")
    if (!Array.isArray(req.body)) 
        return res.status(400).json({ 
                    error: 'El body debe ser un arreglo.'
                    });
    let tempArray = [];
    let products = data_handler.getProducts();
    let flag=false;
    (req.body).forEach(element => {
        if(products.find(product => JSON.stringify(product)==JSON.stringify(element))==undefined){
            flag=true;
            return res.status(404).json({ 
                error: 'No se encontró un elemento '
            }); }
        tempArray.push(element);
    });
    if (!flag) {
    console.log("tempArray= ",tempArray);
    res.set("Content-Type", "application/json");
    res.status(200);
    res.send(JSON.stringify(tempArray));
    }
});


router.get('/:id', (req, res) => {
    console.log('Consultando products by ID');
    let ID=req.params.id;
    let product = data_handler.getProductById(ID)
    if (product == null) return res.status(404).json({ 
        error: 'No se encontró el producto '
    }); 
    console.log("El producto por id fue: ",product);
    res.set("Content-Type", "application/json");
    res.status(200);
    res.send(product);
})


module.exports = router;
