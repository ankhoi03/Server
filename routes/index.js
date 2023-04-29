var express = require('express');
var router = express.Router();
const adminController = require('../components/admin/AdminController');
const productController = require('../components/products/ProductController');
const jwt = require('jsonwebtoken');
const auth = require('../middle/Authen');
const validation=require('../middle/Validation');
/* GET home page. */
//  http://localhost:3000/dashboard
router.get('/dashboard', [auth.authenWeb], function (req, res, next) {

  res.render('index');
});
/* GET Login page. */
//  http://localhost:3000/login
router.get('/login', [auth.authenWeb], function (req, res, next) {

  res.render('user/login');

});

// Handle register Admin
router.post('/register',[validation.checkRegister], async function (req, res, next) {
  try {
      const { email, password, name } = req.body;
      const result = await adminController.register(email, password, name);
      return res.status(200).json({ result });
  } catch (error) {
      console.log(error);
      return res.status(400).json({ result: false })
  }
})

/* Handle Login. */
router.post('/login', [auth.authenWeb], async function (req, res, next) {

  const { email, password } = req.body;
  const result = await adminController.login(email, password);

  if (result) {
    //session
    const token = jwt.sign({ _id: result._id }, 'secret');
    req.session.token = token;
    return res.redirect('/dashboard');
  } else {
    return res.redirect('/login')
  }
});



//logout
router.get('/logout', [auth.authenWeb], async function (req, res, next) {
  req.session.destroy();

  res.redirect('/login');
});


//test doi page
router.get('/product', async function (req, res, next) {
  const products = await productController.getAllProducts();
  res.render('product/list', { products });
});




module.exports = router;
