const mongoose = require('mongoose')

const Schema = mongoose.Schema

const financeSchema = new Schema({
    spent:{type:Number, required:true},
    category:{type:String, required:true},
    date:{type:String, required:true},
    user_id:{type:Schema.Types.ObjectId, required:true}
})

const Finance = mongoose.model('Finance', financeSchema)
module.exports = Finance