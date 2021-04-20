const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const UserController = {
//Register
    async register(req, res){
      
        const {username, email, password} = req.body
        const exist = await User.findOne({email});
    if(exist){
        return res.status(400).send({
            success: false,
            mes: "Account already exist!"
        });
    }
     const newUser = new User({username, email, password})
    newUser.password = newUser.generateHash(password)
     newUser.save()
     .then(()=>{res.json('User has been created')})
     .catch((err)=>{res.status(400).json(err)})
    },
//SignIn
    async singIn(req, res){
      
        const {username, email, password} = req.body
    const user =  await User.findOne({username, email});
        if(!user){
            return res.status(400).send({
            success: false,
            mes: "Account doesn't exist!"
        });
    }

    const passwordValid = user.validPassword(password);
        if(!passwordValid){
            return res.status(400).send({
                success: false,
                mes: "Wrong password!"
            });
    }

    const token = jwt.sign({
        _id:user._id,
        username:user.username
      },process.env.TOKEN_SECRET);
      res.send(token);
    },
}
module.exports = UserController