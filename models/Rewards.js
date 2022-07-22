const mongoose = require('mongoose')
const Schema = mongoose.Schema


const RewardsSchema = new Schema({
  
    nfts:{
        type:Schema.Types.ObjectId,
        ref:"nfts"
    },
    belongToCampaign:{
        type:Schema.Types.ObjectId,
        ref:"campaigns"
    },
    amount:{
        type:Number,
        require:true,
    },
    target:{
        type:Number,
        require:true,
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('rewards', RewardsSchema)