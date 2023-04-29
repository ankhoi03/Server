var express = require('express');
var router = express.Router();
const userController = require('../../components/users/UserController');
const cartController = require('../../components/carts/CartController');
const validation= require('../../middle/Validation');
const jwt = require('jsonwebtoken');
const {authenApp}= require('../../middle/Authen');


//api login client
router.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await userController.login(email, password);
        if (user) {
            const token=jwt.sign({user}, 'secret', {expiresIn:'1h'});
            return res.status(200).json({ result: true, user: user ,token});
        }
        return res.status(400).json({ result: false, user: null });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false, user: null })
    }
})

//api register client
router.post('/register',[validation.checkRegister], async function (req, res, next) {
    try {
        const { email, password, name } = req.body;
        const result = await userController.register(email, password, name);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
})

//api add product to cart
router.post('/addtocart',[authenApp], async function (req, res, next) {
    try {
        const { userId, productId, quantity } = req.body;
        const result = await cartController.addProductToCart(userId, productId, quantity);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
});

router.get('/getcart/:userId',[authenApp], async function (req, res, next) {
    try {
        const { userId } = req.params;
        const result = await cartController.getCart(userId);
        return res.status(200).json( {cart: result} );
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
})

router.get('/cart/delete/:id',[authenApp], async (req, res, next) => {
    try {
        const { id } = req.params;
        await cartController.delProductFromCart(id);
        return res.json({ status: true });
    } catch (error) {
        return res.json({ status: false })
    }
});

router.post('/incrementcart',[authenApp], async function (req, res, next) {
    try {
        const {id} = req.body;
        const result = await cartController.incrementCartItem(id);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
});
router.post('/decrementcart',[authenApp], async function (req, res, next) {
    try {
        const {id} = req.body;
        const result = await cartController.decrementCartItem(id);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
});

router.post('/sendmail',[], async function (req, res, next) {
    try {
        const {email,subject} = req.body;
        let content=`<h1>Chào bạn</h1>
                <p>Chúc mừng bạn đã đăg ký thành công tài khoản</p>
        `;
        const result = await userController.sendEmail(email,subject,content);
        return res.status(200).json({ result });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ result: false })
    }
});

module.exports = router;