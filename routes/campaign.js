const express = require("express");
const router = express.Router();

const Campaigns = require('../models/Campaign');

router.post('/create',async (req,res)=>{
    const{author,title,content,image,whitepaper,website,target,endAt} = req.body
    if(!author){
        return res.status(400).json({ success: false, message: 'author is required' })
    }
    if(!title){
        return res.status(400).json({ success: false, message: 'title is required' })
    }
    if(!content){
        return res.status(400).json({ success: false, message: 'content is required' })
    }
    if(!image){
        return res.status(400).json({ success: false, message: 'image is required' })
    }
    if(!whitepaper){
        return res.status(400).json({ success: false, message: 'whitepaper is required' })
    }
    if(!website){
        return res.status(400).json({ success: false, message: 'website is required' })
    }
    if(!target){
        return res.status(400).json({ success: false, message: 'target is required' })
    }
    if(!endAt){
        return res.status(400).json({ success: false, message: 'endAt is required' })
    }
    try {
        const campaingn = new Campaigns({author,title,content,image,whitepaper,website,target,endAt})
        await campaingn.save();
        return res.status(200).json({success:true, campaing: campaingn})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }

})

module.exports = router;