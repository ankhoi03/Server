

const productServer=require('./ProductService');

const getAllProducts= async ()=>{
     try {
          return await productServer.getAllProducts();
     } catch (error) {
        throw error;  
     }
    
}
const deleteProductById= async (id)=>{
     try {
          return await productServer.deleteProductById(id);   
     } catch (error) {
          throw error;
     }
    
}

const addNewProduct= async (name,price,quantity,image,category,display,system,ram,rom,chip,camera,battery)=>{
     try {
          return await productServer.addNewProduct(name,price,quantity,image,category,display,system,ram,rom,chip,camera,battery);   
     } catch (error) {
          throw error;
     }
    
}

const updateProduct= async (id,name,price,quantity,image,category,display,system,ram,rom,chip,camera,battery)=>{
     try {
          return await productServer.updateProduct(id,name,price,quantity,image,category,display,system,ram,rom,chip,camera,battery);   
     } catch (error) {
          throw error;
     }
    
}

const getProductById= async (id)=>{
     try {
          return await productServer.getProductById(id);   
     } catch (error) {
          throw error;
     }
    
}

const search= async (keyword)=>{
     try {
          return await productServer.search(keyword);   
     } catch (error) {
         console.log('Search ERROR: ',error)
     }
    
}
module.exports={getAllProducts,deleteProductById,addNewProduct,updateProduct,getProductById,search};

