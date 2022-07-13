const mongoose = require('mongoose')
const Schema = mongoose.Schema


const FundSchema = new Schema({
    sponsor:{
        type:String,
        require:true
    },
    belongToCampaign:{
        type:Schema.Types.ObjectId,
        ref:"campaigns"
    },
    amount:{
        type:Number,
        require:true,
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('fund', FundSchema)