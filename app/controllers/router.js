const express = require('express');
const path = require('path');
const productRouter = require('../routes/products');
const adminProductRouter = require('../routes/admin_products');
const router = express.Router();



router.use('/products', productRouter);
router.use('/admin/products', validateAdmin ,adminProductRouter);

function validateAdmin(req, res, next){
    if (req.get('x-auth')=="admin"){
        console.log('Acceso autorizado');
        next();
    }
    else{
        console.log('Acceso no autorizado');
        return res.status(403).json({ 
            error: '“Acceso no autorizado, no se cuenta con privilegios de administrador'
        }); 
    }
    
}

router.get('/',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/home',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/home.html")));
router.get('/shopping_cart',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/shopping_cart.html")));

router.get('/CreateNewProduct',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/CreateNewProduct.html")));
router.get('/about_us',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/about_us.html")));
router.get('/cat_A',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/cat_A.html")));
router.get('/cat_B',(req, res) => res.sendFile(path.resolve(__dirname + "/../views/cat_B.html")));


module.exports = router;