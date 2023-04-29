var express = require('express');
var router = express.Router();

const categoryController = require('../../components/category/CategoryController');
const productController = require('../../components/products/ProductController');

const { initializeApp } = require('firebase/app');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');
const multer = require('multer');



const config = require('../../config/Config');
const auth = require('../../middle/Authen');

const firebaseConfig = {
    apiKey: "AIzaSyCgvEd6dtFmk2_M5jZNa0gdL5CIC0dolms",
    authDomain: "project01-429a7.firebaseapp.com",
    projectId: "project01-429a7",
    storageBucket: "project01-429a7.appspot.com",
    messagingSenderId: "988879330430",
    appId: "1:988879330430:web:075690b8029e80faa38c2f",
    measurementId: "G-L6Y03YG5DK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

// Setting up multer as a middleware to grab photo uploads
const upload = multer({ storage: multer.memoryStorage() });
//get all product
router.get('/list', [auth.authenWeb], async (req, res, next) => {
    const products = await productController.getAllProducts();
    res.render('product/list', { products });
});
//delete product by id
router.get('/:id/delete', [auth.authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        await productController.deleteProductById(id);
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false })
    }
});
//load form add new product
router.get('/new', async (req, res, next) => {
    const categories = await categoryController.getAllCategories();
    res.render('product/new', { categories });
});
//handle add new product
router.post('/new', [auth.authenWeb,upload.single('image')], async (req, res, next) => {
    try {
        let { body, file } = req;

        if (file) {
            const dateTime = giveCurrentDateTime();

            const storageRef = ref(storage, `images/${req.file.originalname + "_" + dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('File successfully uploaded.');

            body = { ...body, image: downloadURL }



        }

        let { name, price, quantity, image, category,display,system,ram,rom,chip,camera,battery } = body;

        await productController.addNewProduct(name, price, quantity, image, category,display,system,ram,rom,chip,camera,battery);
        return res.redirect('/cpanel/product/list')
    } catch (error) {
        console.log('Add product ERROR:', error);
        next(error);
    }


});

//load page update product
router.get('/:id/edit', [auth.authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductById(id);
        let categories = await categoryController.getAllCategories();
        for (let index = 0; index < categories.length; index++) {
            const element = categories[index];
            categories[index].selected = false;
            if (element._id.toString() == product.category.toString()) {
                categories[index].selected = true;
            }
        }
        res.render('product/edit', { product, categories });
    } catch (error) {

    }
});

//handle update new product
router.post('/:id/edit', [[auth.authenWeb],upload.single('image')], async (req, res, next) => {
    try {
        let { id } = req.params;
        let { body, file } = req;
        //remember change IP 
        if (file) {
            const dateTime = giveCurrentDateTime();

            const storageRef = ref(storage, `images/${req.file.originalname + "_" + dateTime}`);

            // Create file metadata including the content type
            const metadata = {
                contentType: req.file.mimetype,
            };

            // Upload the file in the bucket storage
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

            // Grab the public url
            const downloadURL = await getDownloadURL(snapshot.ref);

            console.log('File successfully uploaded.');
            
            body = { ...body, image: downloadURL }
        }
        let { name, price, quantity, image, category,display,system,ram,rom,chip,camera,battery } = body;
        // image = 'https://www.elle.vn/wp-content/uploads/2023/02/19/516696/vuong-so-nhien-nghe-noi-em-thich-toi-scaled.jpg';
        await productController.updateProduct(id, name, price, quantity, image, category,display,system,ram,rom,chip,camera,battery);
        return res.redirect('/cpanel/product/list')
    } catch (error) {
        console.log('Update product ERROR:', error);
        next(error);
    }


});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = router;