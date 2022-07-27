const express = require("express");
const router = express.Router();
const mongoose =  require("mongoose");
const NFT = require('../models/Nfts');

router.post('/upload',async (req,res)=>{
    const {image,belongToCampaign} = req.body
    if(!image){
        return res.status(400).json({ success: false, message: 'image is required' })
    }
    if(!belongToCampaign){
        return res.status(400).json({ success: false, message: 'belongToCampaign is required' })
    }
    try {
        const nft = new NFT({image,belongToCampaign})
        await nft.save();
        return res.status(200).json({success:true, nft: nft})
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})
router.get('/:id',async (req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res
          .status(400)
          .json({ success: false, message: "nftid is required" });
      }
      try {
        let nft = await NFT.findById(req.params.id);
        res.json({nft})
      } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
      }
   
})
module.exports = router;