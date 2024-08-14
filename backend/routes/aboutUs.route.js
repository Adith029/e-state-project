const {Router} = require ('express')
const aboutUs = require('../controller/contactUs.controller')

const route = Router()

route.post('/send',aboutUs.addMessages)

module.exports=route