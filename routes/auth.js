const express =require('express')
const router = express.Router()
const passport = require('passport')


//@desc auth eith Google
//@route GET/auth/google
router.get('/google',passport.authenticate('google', {scope:['profile']}))

//@desc google auth callback
//@route GET/auth/googke/callback
router.get('/google/callback',passport.authenticate('google', {failureRedirect:'/'}),(req,res)=>{
    res.redirect('/dashboard')
})

module.exports=router