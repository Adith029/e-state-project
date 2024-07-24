const contactDB = require('../models/contactus')

const addMessages = async (req,res)=>{
    const message = req.body
    try {
        const add = await contactDB.create(message)
        return res.status(200).send({message:"Response send successfully"})
    } catch (error) {
        console.log(error);
    }
}

module.exports={addMessages}