const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = new Schema({
    address:{
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
    },
    username:{
        type:String,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', UserSchema)