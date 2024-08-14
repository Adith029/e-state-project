const {Router} = require ('express')
const adminController = require('../controller/admincontroller')
const {isAdmin} = require ('../middleware/verifyToken.js')
const route = Router()

route.get('/view/buyer',adminController.viewBuyer)
route.delete('/delete/buyer/:id',isAdmin,adminController.deleteBuyer)
route.get('/view/seller',adminController.viewSeller)
route.delete('/delete/seller/:id',isAdmin,adminController.deleteseller)
route.get('/approve/seller/:id',isAdmin,adminController.approveSeller)
route.get('/viewEnquiry',isAdmin,adminController.viewEnquiry)

module.exports=route