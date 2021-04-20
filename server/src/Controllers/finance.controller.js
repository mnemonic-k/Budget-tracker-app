const Finance = require('../models/finance.model')
const User = require('../models/user.model')
const FinanceController = {

    createFinance(req, res){
    const {spent, category} = req.body
    const date = req.body.dateStr
    const{_id} = req.user
    let user_id = _id
    const newFinanceEntry = new Finance({spent, category, date, user_id})

    newFinanceEntry.save()
    .then(()=>{res.status(201).send('Entry has been added successfully')})
    .catch(()=>{res.status(400).send('Error!!!')})
    },

     getAllFinance(req, res){
        const date = req.body.dateStr
        let user_id = req.user._id
        Finance.find({user_id, date})
        .then((data)=>{
            res.status(200).send(data)
        })
        .catch(err=>{
            res.status(400).send(err)
        })
    },
  
    updateFinance(req, res){
        const {spent, category, dateStr, _id} = req.body
        Finance.updateOne({_id}, {spent, category, date:dateStr})
        .then(()=>{res.status(200).send('Data has been updated successfully')})
        .catch(err=>{res.status(400).send(err)})
    },
    
    deleteFinance(req, res){
        const {_id} = req.body
        Finance.deleteOne({_id})
        .then(()=>{res.status(204).send('Entry has been deleted successfully')})
        .catch(err=>{res.status(400).send(err)})
    }
}
module.exports = FinanceController