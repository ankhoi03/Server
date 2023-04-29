const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        default: 'No name' // giá trị mặc định
    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type:String,
        required: true
    }
});
module.exports = mongoose.models.admin || mongoose.model('admin', schema);
// user ---------> users