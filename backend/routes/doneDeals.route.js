const {Router} = require ('express')
const doneDeal = require('../controller/doneDeals.controller')
const {verifyToken} = require('../middleware/verifyToken')
const route = Router()

route.post('/properties/:id',verifyToken,doneDeal.markDoneDeal);
route.get('/view',verifyToken,doneDeal.viewDoneDeals)

module.exports=route