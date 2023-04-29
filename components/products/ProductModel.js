
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const schema = new Schema({
    id: { type: ObjectId }, // khóa chính
    name: {
        type: String, // kiểu dữ liệu
        default: 'No name' // giá trị mặc định
    },
    price: { type: Number },
    quantity: { type: Number },
    image: { type: String },
    category: { type: ObjectId, ref: 'category' },
    display: { type: String },
    system: { type: String },
    ram: { type: String },
    rom: { type: String },
    chip: { type: String },
    camera: { type: String },
    battery: { type: String }


});
module.exports = mongoose.models.product || mongoose.model('product', schema);
//product ------->products