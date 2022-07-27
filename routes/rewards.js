const express = require("express");
const { db } = require("../models/Rewards");
const router = express.Router();
const mongoose =  require("mongoose");
const Rewards = require('../models/Rewards');

router.post('/create',async (req,res)=>{
    const {nfts,belongToCampaign,amount,target} = req.body
    if(!nfts){
        return res.status(400).json({ success: false, message: 'nfts is required' })
    }
    if(!belongToCampaign){
        return res.status(400).json({ success: false, message: 'belongToCampaign is required' })
    }
    if(!amount){
        return res.status(400).json({ success: false, message: 'amount is required' })
    }
    if(!target){
        return res.status(400).json({ success: false, message: 'target is required' })
    }
    try {
        const rw = new Rewards({nfts,belongToCampaign,amount,target})
        await rw.save();
        return res.status(200).json({success:true, reward: rw})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
router.get('/:campaignId',async (req,res)=>{
    if( !mongoose.Types.ObjectId.isValid(req.params.campaignId) ){
        return res.status(400).json({ success: false, message: 'campaignId is required' })
    } 
    let rw = await Rewards.find({belongToCampaign:req.params.campaignId })
    res.json({reward:rw})
})

router.put('/mint/:rwId',async (req,res)=>{
    if( !mongoose.Types.ObjectId.isValid(req.params.rwId) ){
        return res.status(400).json({ success: false, message: 'rwId is required' })
    } 
    try {
        // let rw = await Rewards.findOneAndUpdate( {nfts: req.query.rwId, $inc: { amount : - 1 }})
        let rw = await Rewards.find({nfts:req.params.rwId }).update({$inc: { amount : - 1 }})
        res.json({message:"mint success"})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
 
})
module.exports = router;