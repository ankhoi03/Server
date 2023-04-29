const adminService=require('./AdminService');

const login =async (email,password)=>{
   try {
     return await adminService.login(email,password);
   } catch (error) {
    console.log(error)
   }
}

const register =async (email,password,name)=>{
    try {
        return await adminService.register(email,password,name);
    } catch (error) {
        console.log(error)
    }
}

module.exports={login,register};