const userService=require('./UserService');
const mailer= require('nodemailer');



const login =async (email,password)=>{
   try {
     return await userService.login(email,password);
   } catch (error) {
    console.log(error)
   }
}

const register =async (email,password,name)=>{
    try {
        return await userService.register(email,password,name);
    } catch (error) {
        console.log(error)
    }
}

const transporter = mailer.createTransport({
    pool: true,
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use TLS
    auth: {
        user: 'ankhoit528@gmail.com',
        pass: 'zlccmdqovywbobpa'
    },
});

const sendEmail= async (email,subject,content)=>{
    try {
        const mailOption={
            from : 'Tô An Khôi <ankhoit528@gmail.com>',
            to: email,
            subject:subject,
            html:content,
        };
        return await transporter.sendMail(mailOption);
    } catch (error) {
        console.log('>>>>>>Send Mail ERROR:',error);
    }
    return false
}

module.exports={login,register,sendEmail};