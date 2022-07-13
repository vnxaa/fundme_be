const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CampaignSchema = new Schema({
    author:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    content:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    whitepaper:{
        type:String,
        require:true,
    },
    website:{
        type:String,
        require:true,
    },
    target:{
        type:Number,
        require:true,
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createAt:{
        type:Date,
        default: Date.now
    },
    endAt:{
        type:Date
    }
})

module.exports = mongoose.model('campaigns', CampaignSchema)