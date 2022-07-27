const express = require("express");
const router = express.Router();

const User = require('../models/User');

router.post('/login',async (req,res)=>{
    const {address} = req.body
    if(!address){
        return res.status(400).json({ success: false, message: 'address is required' })
    }
    try {
        const user = await User.findOne({address})
        
        if(user){
            return res.status(200).json({success:true,message:"login successful",user:user})
        }else{
            const newUser= new User({address});
            await newUser.save();
            return res.status(200).json({success:true,message:"register and login successful",user:newUser })
        }
        
    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router;