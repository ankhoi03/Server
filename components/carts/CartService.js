const cartModel = require('./CartModel');
const userModel= require('../users/UserModel');
const productModel= require('../products/ProductModel');

async function addProductToCart(userId, productId, quantity) {
  try {
    // Kiểm tra xem người dùng có tồn tại hay không
    const user = await userModel.findOne({ _id: userId });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Kiểm tra xem sản phẩm có tồn tại hay không
    const product = await productModel.findOne({ _id: productId });
    if (!product) {
      return { success: false, message: 'Product not found' };
    }

    // Kiểm tra xem sản phẩm đã có trong giỏ hàng của người dùng hay chưa
    const cartItem = await cartModel.findOne({ userId, productId });
    if (cartItem) {
      // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng sản phẩm
      await cartModel.updateOne({ _id: cartItem._id }, { $inc: { quantity: quantity } });
    } else {
      // Nếu sản phẩm chưa có trong giỏ hàng, tạo bản ghi mới trong collection "cart"
      await cartModel.create({ userId, productId, quantity });
    }

    return { success: true, message: 'Product added to cart' };
  } catch (error) {
    console.log(error);
    return { success: false, message: 'Something went wrong' };
  }

}

async function getCart(userId) {
  try {
    const cartItem = await cartModel.find({userId:userId}).populate('productId');
    return cartItem;
  } catch (err) {
    console.error(err);
  }
}


async function delProductFromCart(id) {
  try {
    await cartModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.log('>>>>>>>>Delete product ERROR:', error);
  }
  return false;
}


async function incrementCartItem(id) {
  try {
    let item = await cartModel.findById(id);
    if(item){
      item.quantity =  item.quantity +1;
      await item.save();
      return true;
    }
  } catch (error) {
    console.log('>>>>>>>>Increment product ERROR:', error);
  }
  return false;
}

async function decrementCartItem(id) {
  try {
    let item = await cartModel.findById(id);
    if(item && item.quantity>1){
      item.quantity =  item.quantity -1;
      await item.save();
      return true;
    }
  } catch (error) {
    console.log('>>>>>>>>Decrement product ERROR:', error);
  }
  return false;
}
module.exports = {addProductToCart,getCart,delProductFromCart,incrementCartItem,decrementCartItem};