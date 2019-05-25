const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{type:String, trim:true, required:true },
    email:{type:String, trim:true, required:true, unique:true},
    password:{type:String, trim:true, required:true},
    register_date:{default : Date.now, type:Date }
});

module.exports = Item = mongoose.model('User', UserSchema);