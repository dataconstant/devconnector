const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const Profile = require('../../models/Profile')
const User = require('../../models/User');

router.get('/me', auth, async (req, res)=>{
    try{
        const profile = await Profile.findOne({user:req.user.id}).populate('user', ['name','avatar']);
        if(!profile){
            return res.status(400).json('There is no profile for this user');
        }
        res.json(profile)
    }catch(error){
        console.log(error)
        res.status(500).send('Server Error')
    }
});

module.exports = router;