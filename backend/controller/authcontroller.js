const userDB = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

 // Adjust the path as needed

const addUsers = async (req, res) => {
    try {
        const { confirmPassword, ...data } = req.body;

        // Log password to ensure it is defined
        if (!data.password) {
            return res.status(400).send("Password is required");
        }

        const plainPassword = data.password;
        const saltRounds = 10;

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
        data.password = hashedPassword;

        // Create the user
        const user = await userDB.create(data);


        return res.status(200).send("User created");
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message || "Server error");
    }
};

module.exports = { addUsers };


 const loginUser= async(req,res)=>{
  const {email,password} = req.body
  try {
    const findUser = await userDB.findOne({email})
    
    if(!findUser){
      return res.status(404).send("User Not Found");
    }
    const  plainPassword = findUser.password
    const passwordCheck = await bcrypt.compare(password,plainPassword);
    if (!passwordCheck) {
      return res.status(401).send("Invalid Credentials");
    }
    const token = jwt.sign({ sub: findUser }, process.env.JWT_TOKEN, { expiresIn:'3d'})
    res.json({"token":token,"data":findUser,"Properties":findUser.properties})

    
  } catch (error) {
    console.error(error);
  }
 }

 module.exports = {addUsers,loginUser}