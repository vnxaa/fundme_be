const express = require("express");
const router = express.Router();
const User = require('../models/User');
const mongoose =  require("mongoose");
//update profile
router.put('/update/:id',async (req,res)=>{
    const {image,username} = req.body

    if(!username){
        return res.status(400).json({ success: false, message: 'username is required' })
    }

    try {
        let update={
            image: image||'',
            username:username,
        }

      let profileUpdate=  await User.findByIdAndUpdate(req.params.id,update,{new:true})
      res.json({user: profileUpdate})

    } catch (error) {
        console.log(error)
		res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

//get profile byt id
router.get('/:id',async (req,res)=>{
     if( !mongoose.Types.ObjectId.isValid(req.params.id) ){
        return res.status(400).json({ success: false, message: 'id is required' })
    } 
    let user = await User.findById(req.params.id);
    res.json(user)
})

module.exports = router;