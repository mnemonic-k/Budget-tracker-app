const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true}
})

userSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8,null))
}
userSchema.methods.validPassword = function (password){
    return bcrypt.compareSync(password, this.password)
}

const User = mongoose.model('Users', userSchema)

module.exports = User

console.log('TEST')
