const {Router} = require('express')
const postController = require('../controller/post.controller')
const {verifyToken} = require ('../middleware/verifyToken.js')
const route = Router()

route.post('/add',verifyToken,postController.addProperties)
route.put('/rating',verifyToken,postController.rating)
route.get('/view',verifyToken,postController.viewProperty) 
route.get('/viewAll',postController.viewAllProperties)  
route.get('/view/:id',postController.viewPropertyById)
route.get('/favorites',verifyToken,postController.viewFavorites)
route.get('/search',verifyToken,postController.viewProperties)
route.put('/update/:id',verifyToken,postController.updateProperties)
route.delete('/delete/:id',verifyToken,postController.deleteProperty)

module.exports =route