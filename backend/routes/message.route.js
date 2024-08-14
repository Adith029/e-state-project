const {Router} = require ('express')
const messageRoutes = require('../controller/messageController')
const {verifyToken} = require('../middleware/verifyToken')
const route = Router()

route.post("/:chatId", verifyToken,messageRoutes.addMessage);



module.exports=route