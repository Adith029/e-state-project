const jwt = require('jsonwebtoken');
const propertyDB = require('../models/properties');
const userDB = require('../models/users');
require('dotenv').config();

const addProperties = async (req, res) => {
    const tokenUserId = req.userId; 
    const userName = req.userName; // Changed variable name to be more descriptive
    try {
      const body = req.body;
      if (req.userRole === 'seller') {
        const newProperty = await propertyDB.create({ ...body, owner: tokenUserId, name: userName });
        await userDB.findByIdAndUpdate(tokenUserId, { $push: { properties: newProperty._id } });
        return res.status(200).json({ message: "Property created", property: newProperty });
      } else {
        return res.status(401).send({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };
  

const viewProperty = async (req, res) => {
    try {
       const userId = req.userId
       const products = await propertyDB.find({owner:userId})
       if (!products || products.length === 0) {
        return res.status(404).send("No products found for this user");
      }
  
      return res.status(200).send(products);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const viewAllProperties = async (req,res)=>{
    try {
        const properties = await propertyDB.find()
        return res.status(200).send(properties)
    } catch (error) {
        console.error(error);
    }
}

const viewProperties = async (req, res) => {
    try {
        const { type, city, bedroom } = req.query;
        const query = {
            ...(type && { type }),
            ...(city && { city }),
            ...(bedroom && { bedroom })
        };

        const properties = await propertyDB.find(query).populate('owner', 'name email');
        if (!properties.length) {
            return res.status(404).json({ message: "Properties not found" });
        }
        return res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateProperties = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.userId; // Assuming verifyToken middleware sets req.userId
    const body = req.body;

    try {
        const property = await propertyDB.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        if (property.owner.toString() !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized to update this property" });
        }
        await property.updateOne(body);
        return res.status(200).json({ message: "Property updated" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

const deleteProperty = async (req, res) => {
    const { id } = req.params;
    const tokenUserId = req.userId; // Assuming verifyToken middleware sets req.userId

    try {
        const property = await propertyDB.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        if (property.owner !== tokenUserId) {
            return res.status(403).json({ message: "Not authorized to delete this property" });
        }
        await propertyDB.deleteOne({ _id: id });
        await userDB.findByIdAndUpdate(tokenUserId, { $pull: { properties: id } });
        return res.status(200).json({ message: "Property deleted" });
    } catch (error) {
        console.error(error);
        return res.status(500).json(error);
    }
};

const viewPropertyById = async (req, res) => {
    const { id } = req.params; // Assuming the property ID is passed as a route parameter
    
    try {
        const property = await propertyDB.findById(id).populate('owner', 'name email');
        if (!property) {
            return res.status(404).json({ message: "Property not found" });
        }
        return res.status(200).json(property);
    } catch (error) {
        console.error("Error retrieving property:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const viewFavorites = async (req,res) =>{
    const userId = req.userId
    
    try {
        const response = await propertyDB.find({favorites:userId})
        return res.status(200).json(response)
    } catch (error) {
    console.error("Error retrieving favorites:", error);
    }
}

const rating = async (req,res)=>{
const _id = req.userId
const {star,postId} = req.body
try {
    const post = await propertyDB.findById(postId)
    let alreadyRated = post.ratings.find(rating => 
        rating.postedBy && rating.postedBy.toString() === _id.toString()
    );

    if (alreadyRated) {
        // Update existing rating
        const updateRating = await propertyDB.updateOne(
            { _id: postId, "ratings.postedBy": _id },
            { $set: { "ratings.$.star": star } },
            { new: true }
        );
}else{
    const rateProduct = await propertyDB.findByIdAndUpdate(postId,
        {
            $push:{
                ratings:{
                    star:star,
                    postedBy:_id,
                },
            },
        },
        {
            new:true,
        }
    )
}

const getAllRatings = await propertyDB.findById(postId)
let totalRatings = getAllRatings.ratings.length;
let ratingSum = getAllRatings.ratings.map((item)=>item.star).reduce((prev,curr)=>prev+curr,0);
let actualRating = Math.round(ratingSum/totalRatings)
const finalProduct = await propertyDB.findByIdAndUpdate(
    postId,
    {
        totalRatings:actualRating
    },
    {new:true}
)
res.json(finalProduct)
} catch (error) {
    throw new Error (error)
}
}
module.exports = { addProperties,viewAllProperties ,deleteProperty, updateProperties, viewProperties, viewProperty, viewPropertyById , viewFavorites,rating};
