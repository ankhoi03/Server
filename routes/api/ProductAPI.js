var express = require('express');
var router = express.Router();
const productController = require('../../components/products/ProductController');
const {authenApp}= require('../../middle/Authen');
//http://localhost3000:/api/product/allproducts
//get all product
router.get('/allproducts',[authenApp], async function (req, res, next) {
    try {
        const products = await productController.getAllProducts();
        return res.status(200).json({ products })
    } catch (error) {
        return res.status(400).json({})
    }
});
//get product by id
router.get('/:id',[authenApp], async function (req, res, next) {
    try { 
        const {id}=req.params;
        const product = await productController.getProductById(id);
        return res.status(200).json({ product })
    } catch (error) {
        return res.status(400).json({})
    }
});

//add new product
router.post('/add',[authenApp], async function(req, res, next){
    try {
        const {name, price ,quantity , image , category}=req.body;
        await productController.addNewProduct(name,price,quantity,image,category);
        return res.status(200).json({result :true});
    } catch (error) {
        return res.status(400).json({result :false});
    }
}) 

//search product
router.get('/search/name',[authenApp],async function(req, res, next){
    try {
        const {keyword}=req.query;
        const products= await productController.search(keyword);
        return res.status(200).json({ products });
    } catch (error) {
        return res.status(400).json({result :false});
    }
}) 

module.exports = router;