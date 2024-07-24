const {Router} = require ('express')
const userController = require('../controller/usercontroller')
const {verifyToken} = require('../middleware/verifyToken')
const route = Router()

route.get('/view',userController.viewUser)
route.get('/viewById/:id',userController.viewUserById)
route.put('/update/:userId',userController.updateUser)
route.delete('/delete/:id',userController.deleteUser)
route.post('/addToFavorites/:id',verifyToken,userController.addToFavorites)
route.delete('/deleteFromFavorites/:id',verifyToken,userController.deletFromFavorites)
route.get("/notification", verifyToken, userController.getNotificationNumber);



module.exports=route