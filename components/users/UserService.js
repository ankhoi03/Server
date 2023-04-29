const userModel = require('./UserModel');
const bcrypt = require('bcryptjs');


const login = async (email, password) => {
    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            let check = bcrypt.compareSync(password, user.password);
            return check ? user : false;
        }
    } catch (error) {
        console.log('>>>>>>Login ERROR: ', error);
    }
    return false;
}

const register = async (email, password, name) => {
    try {
        // const user=users.find(u=>u.email.toString()==email.toString());
        //select * from users where email=email
        const user = await userModel.findOne({ email: email });
        if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            const newUser = {
                email: email,
                password: hash,
                name: name
            }
            await userModel.create(newUser);
            return true;
        }
    } catch (error) {
        console.log(error);

    }
    return false;
}
const addToCart=async function(email, ){
    try {
        let user = await userModel.findOne({ email: email });
        if (user) {
            
        }
    } catch (error) {
        
    }
}

module.exports = { login, register };

var users = [
    { _id: '1', email: 'khoikz@gmail.com', password: '1', name: 'To An Khoi' },
    { _id: '2', email: 'minthoang@gmail.com', password: '2', name: 'Hua Minh Hoang' }
]