const express = require('express');

const router = require('./app/controllers/router');

const app = express()
const port = 3000;

app.use(express.static('app'));
app.use('/views',express.static('views'));


app.use(express.json());
app.use('',router);
app.listen(port, ()=>{
    console.log("Aplicación de ejemplo corriendo en puerto ",port);
});

/* 
app.get('/products', (req, res) => {
    console.log('Consultando products');
    fs.readFile("./app/data/products.json", "utf8", function(error, data){
        if(error) {
            console.log(error);
        }
        products=JSON.parse(data);
        var q = req.url.split('?')[1];
        //console.log(q);
        products=findProduct(products,q);
        console.table(products);
        res.send(products);
    })
}) */
