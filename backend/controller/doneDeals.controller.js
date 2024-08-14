const Property = require('../models/properties'); // Adjust the path as necessary
const DoneDeal = require('../models/doneDeals'); // Adjust the path as necessary

const markDoneDeal = async (req, res) => {
    
    try {
        const propertyId = req.params.id;
        
        const property = await Property.findById(propertyId);
        if (!property) {
            return res.status(404).send({ message: 'Property not found' });
        }

        // Create done deal entry
        const doneDeal = new DoneDeal({
            propertyId: property._id,
            details: property.toObject()
        });
        await doneDeal.save();

        // Delete the property from properties collection
        await Property.findByIdAndDelete(propertyId);

        res.status(200).send({ message: 'Property marked as done deal', doneDeal });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

const viewDoneDeals = async (req,res)=>{

    try {
        const properties = await DoneDeal.find()
        res.status(200).send(properties)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    markDoneDeal,
    viewDoneDeals
};
