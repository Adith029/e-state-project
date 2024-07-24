const userDB = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const propertyDB = require('../models/properties')
require('dotenv').config()

const viewUser = async (req,res)=>{
    try {
        const users = await userDB.find()
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}

const viewUserById = async (req,res)=>{
  const {id} = req.params
  try {
      const users = await userDB.findById(id)
      return res.status(200).send(users)
  } catch (error) {
      return res.status(500).send(error)
  }
}


const updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const userData = req.body;
  
      // Find the user by ID
      const user = await userDB.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Remove password field if it exists
      delete userData.password;
  
      // Update the user data
      const updatedUser = await userDB.findByIdAndUpdate(userId, userData, { new: true });
  
      // Respond with the updated user data
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

const deleteUser = async(req,res)=>{
    try {
     const {id} = req.params
     await userDB.findByIdAndDelete(id)
     return res.status(200).send("Deleted")
    } catch (error) {
     return res.status(500).send(error)
    }
 }


 const addToFavorites = async (req, res) => {
  const { id } = req.params;
  const  userId  = req.userId; // Ensure userId is passed correctly in request body

  try {
      // Find the property by ID and update the favorites array
      const updatedProperty = await propertyDB.findByIdAndUpdate(
          id,
          { $push: { favorites: userId } }, // Use $addToSet to avoid duplicates
          { new: true }
      );

      // Check if property exists and send updated property data
      if (!updatedProperty) {
          return res.status(404).json({ error: 'Property not found' });
      }

      res.status(200).json(updatedProperty);
  } catch (error) {
      console.error('Error adding to favorites:', error);
      res.status(500).json({ error: 'Server error' });
  }
};




  const deletFromFavorites = async (req,res)=>{
    const { id } = req.params;
    const userId = req.userId;

    try {
      const user = await propertyDB.findByIdAndUpdate(
        id,
        { $pull: { favorites: userId } },
        { new: true }
      );
      res.status(200).json(user);
      
    } catch (error) {
        console.error(error);
    }
  }

  const   getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const number = await Chat.countDocuments({
        userIDs: tokenUserId,
        seenBy: { $ne: tokenUserId },
      });
      res.status(200).json(number);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get notification number!" });
    }
  };
module.exports={viewUser,updateUser,deleteUser,addToFavorites,deletFromFavorites,viewUserById,getNotificationNumber}