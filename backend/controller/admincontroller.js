const userDB = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { json } = require('stream/consumers')
const contactDB = require('../models/contactus')
const propertyDB = require('../models/properties')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

const viewBuyer = async (req,res)=>{
    try {
        const users = await userDB.find({role:'buyer'})
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const viewSeller = async (req,res)=>{
    try {
        const users = await userDB.find({role:'seller'})
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const deleteBuyer = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userDB.findById(id);
  
      if (!user) {
        return res.status(404).send("User Not Found");
      }
  
      if (user.role === 'buyer') {
        await userDB.findByIdAndDelete(id);
        return res.status(200).send("Deleted");
      }
  
      return res.status(403).send("Unauthorized: Not a buyer");
    } catch (error) {
      console.error("Error deleting buyer:", error);
      return res.status(500).send("Internal Server Error");
    }
  };
  

  const deleteseller = async (req, res) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid user ID");
      }
  
      const user = await userDB.findById(id);
      if (user && user.role === "seller") {
        await propertyDB.deleteMany({ owner: id });
        await userDB.findByIdAndDelete(id);
  
        return res.status(200).send("Deleted");
      }
  
      return res.status(401).send("User Not Found or not a seller");
    } catch (error) {
      console.error(error);
      return res.status(500).send(error.message);
    }
  };

 const approveSeller = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await userDB.findById(id);
        if (user) {
            user.role = 'seller';
            await user.save();  // Save the updated user
            return res.status(200).send("Role Updated");
        } else {
            return res.status(401).send("User Not Found");
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
};

const viewEnquiry = async (req,res)=>{
try {
    const messages = await contactDB.find()
    res.status(200).send({messages:messages})
    console.log(messages);
} catch (error) {
    console.log(error);
    return res.status(500).send(error.message);
}
}

module.exports = { approveSeller };

module.exports={viewBuyer,deleteBuyer,deleteseller,viewSeller,approveSeller,viewEnquiry}