const cartService=require('./CartService');


const addProductToCart= async (userId, productId, quantity)=>{
    try {
         return await cartService.addProductToCart(userId, productId, quantity);   
    } catch (error) {
         throw error;
    }
   
}
const getCart= async (userId)=>{
    try {
         return await cartService.getCart(userId);   
    } catch (error) {
         throw error;
    }
   
}

const delProductFromCart= async (id)=>{
    try {
         return await cartService.delProductFromCart(id);   
    } catch (error) {
         throw error;
    }
   
}

const incrementCartItem= async (id)=>{
     try {
          return await cartService.incrementCartItem(id);   
     } catch (error) {
          throw error;
     }
    
 }

 const decrementCartItem= async (id)=>{
     try {
          return await cartService.decrementCartItem(id);   
     } catch (error) {
          throw error;
     }
    
 }


module.exports={addProductToCart,getCart,delProductFromCart,incrementCartItem,decrementCartItem};