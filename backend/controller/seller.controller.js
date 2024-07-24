const userDB = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const viewSeller = async (req, res) => {
    try {
        // Fetch users with the role of 'seller'
        const sellers = await userDB.find({ role: 'seller' }, 'name email phone city photo role');

        if (!sellers) {
            return res.status(404).send("No sellers found");
        }
        
        return res.status(200).json(sellers);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};

module.exports = { viewSeller };



const updateSeller = async (req,res) =>{
    try {
        const {sellerId} = req.params
        const sellerData = req.body
       const seller= await userDB.findById(sellerId)
       if(seller && seller.role=="seller"){
        await userDB.updateOne(sellerData)
        return res.status(200).send(seller)
       }
        else{
            return res.status(200).send("User Not Found")
        }
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteseller = async(req,res)=>{
    try {
     const {id} = req.params
     const user = await userDB.findById(id)
     if(user.role=="seller"){
     return res.status(200).send("Deleted")
     }
     return res.status(401).send("User Not Found")
    } catch (error) {
     return res.status(500).send(error)
    }
 }

module.exports={viewSeller,updateSeller,deleteseller}