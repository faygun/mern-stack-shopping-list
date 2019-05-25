const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name:{default : "", type:String, trim:true, required:true },
    date:{default : Date.now, type:Date }
});

module.exports = Item = mongoose.model('Item', ItemSchema);