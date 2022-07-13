const mongoose = require('mongoose')
const Schema = mongoose.Schema


const NftSchema = new Schema({
    image:{
        type:String,
        require:true,
    },
    belongToCampaign:{
        type:Schema.Types.ObjectId,
        ref:"campaigns"
    },
    createAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model('nfts', NftSchema)