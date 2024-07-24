const {Router} = require ('express')
const sellerController = require('../controller/seller.controller')
const route = Router()

route.get('/view',sellerController.viewSeller)
route.patch('/update/:sellerId',sellerController.updateSeller)
route.delete('/delete/:id',sellerController.deleteseller)

module.exports=route