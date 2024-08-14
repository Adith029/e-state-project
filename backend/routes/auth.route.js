const {Router} = require ('express')
const authController = require('../controller/authcontroller')
const {verifyToken} = require('../middleware/verifyToken.js')
const route = Router()

route.post('/add/user',authController.addUsers)
route.post('/loginuser',authController.loginUser)

module.exports = route;