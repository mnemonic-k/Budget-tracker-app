const Router = require('express')
const router = new Router()
const FinanceControler = require("../Controllers/finance.controller")

router.post("/create",FinanceControler.createFinance)
router.post("/get",FinanceControler.getAllFinance)
router.post("/edit",FinanceControler.updateFinance)
router.post("/remove",FinanceControler.deleteFinance)

module.exports = router