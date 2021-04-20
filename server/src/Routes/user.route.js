const Router = require('express')
const router = new Router()
const UserControler = require("../Controllers/user.controller.js")

router.post("/reg",UserControler.register)
router.post("/signIn",UserControler.singIn)
//router.get("/:id",UserControler.getAllUsers)
//router.put("/:id",UserControler.updateUser)
//router.delete("/:id",UserControler.deleteUser)

module.exports = router