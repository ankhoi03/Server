

const checkRegister = async function (req, res, next) {
    try {
        const { email, password, name, confirm_password } = req.body;
        if (!email || !password || !name || !confirm_password) {
            return res.status(400).json({ result: false, message: 'Vui lòng nhập đầy đủ thông tin !!!' });
        } else {
            if (password.toString() != confirm_password.toString()) {
                return res.status(400).json({ result: false, message: 'Mật khẩu không khớp !!!' });
            }
           
            next();
            
        }
    } catch (error) {
        console.log("Check Register ERROR: ", error);
        return res.status(400).json({ result: false, message: 'Lỗi hệ thống !!!' });
    }
}


module.exports = { checkRegister }