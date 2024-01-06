const router = require('express').Router()
const User = require("../models/User")
const bcrypt = require('bcrypt')


router.post("/register",async (req,res) => {
    if(!req.body.email || !req.body.password || !req.body.username){
        res.status(400).send("Incomplete Credentials")
        return;
    }
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt);
        const newUser = await new User({
            username: req.body.username,
            email : req.body.email,
            password: hashedPassword,
        })
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        console.log(err);
    }
})

router.post("/login", async(req,res) =>{
    if(!req.body.email || !req.body.password){
        res.status(400).send("Incomplete Credentials")
        return;
    }
    try {
        const user = await User.findOne({email : req.body.email});
        if(!user){
            res.status(404).json("User not found")
        } else {
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                res.status(400).json("Wrong Password")
            } else{
                res.status(200).json(user);
            }
        }
       
    } catch(err) {
        res.status(500).json(err)
    }
})


module.exports = router