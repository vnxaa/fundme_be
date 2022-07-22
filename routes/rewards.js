const express = require("express");
const router = express.Router();

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
    let rw = await Rewards.find({belongToCampaign:req.params.campaignId })
    res.json({reward:rw})
})
module.exports = router;