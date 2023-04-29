const adminModel = require('./AdminModel');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
   try {
    let admin=await adminModel.findOne({email: email});
    if(admin){
        let check=bcrypt.compareSync(password, admin.password); 
        return check ? admin : false;
    }
   } catch (error) {
    console.log('>>>>>>Login ERROR: ',error);
   }
   return false;
}

const register = async (email, password, name) => {
    try {
        // const user=users.find(u=>u.email.toString()==email.toString());
        //select * from users where email=email
        const admin = await adminModel.findOne({ email: email });
        if (!admin) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newAdmin = {
                email: email,
                password: hash,
                name: name
            }
            await adminModel.create(newAdmin);
            return true;
        }
    } catch (error) {
        console.log(error);

    }
    return false;
}

module.exports = { login, register };