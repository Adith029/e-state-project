import React, { useState } from 'react';
import '../styles/AddProperties.css';
import ApiRequest from '../lib/ApiRequest';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProperties() {
  const [propertyType, setPropertyType] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [property, setProperty] = useState({
    type: '',
    bathroom: '',
    bedroom: '',
    measurements: '',
    builtIn: '',
    parking: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    price: 0,
    photo: [], // Array to handle multiple photo URLs
    description: '',
    saleOrRent: ''
  });

  const handlePropertyTypeChange = (event) => {
    const selectedType = event.target.value;
    setPropertyType(selectedType);
    setProperty({ ...property, type: selectedType });
  };

  const addHandler = async (e) => {
    e.preventDefault();
    const token = localStorage.token;
    try {
      const add = await ApiRequest.post('properties/add', property, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      toast.success('Property Added');
    } catch (error) {
      toast.error('Failed to add property');
    }
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    if (imageFiles.length === 0) return;

    const uploadedUrls = [];
    for (let file of imageFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'e_state');

      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dyivzqwl0/image/upload', formData);
        uploadedUrls.push(res.data.secure_url);
      } catch (error) {
        toast.error('Failed to upload image');
      }
    }

    setProperty({
      ...property,
      photo: uploadedUrls
    });

    toast.success('Images Uploaded');
  };

  const handleRemoveImage = (url) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      photo: prevProperty.photo.filter((photoUrl) => photoUrl !== url)
    }));
  };


  return (
    <div className="propertyDetails-container">
      <h2 className="propertyDetails-header">Add Property Details</h2>
      <form className="propertyDetails-form" onSubmit={addHandler}>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="propertyType">Property Type</label>
          <select id="propertyType" className="propertyDetails-input" onChange={handlePropertyTypeChange} value={property.type}>
            <option value="">Select Property Type</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>
            <option value="Shop">Shop</option>
          </select>
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="saleOrRent">For Rent or Sale</label>
          <select id="saleOrRent" className="propertyDetails-input" value={property.saleOrRent} onChange={(e) => setProperty({ ...property, saleOrRent: e.target.value })}>
            <option value="">Select Option</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
        {(propertyType === 'House' || propertyType === 'Villa' || propertyType === 'Apartment') && (
          <>
            <div className="propertyDetails-formGroup">
              <label className="propertyDetails-label" htmlFor="bedrooms">Number of Bedrooms</label>
              <input type="number" id="bedrooms" className="propertyDetails-input" placeholder="Bedrooms" value={property.bedroom} onChange={(e) => setProperty({ ...property, bedroom: e.target.value })} />
            </div>
            <div className="propertyDetails-formGroup">
              <label className="propertyDetails-label" htmlFor="bathrooms">Number of Bathrooms</label>
              <input type="number" id="bathrooms" className="propertyDetails-input" placeholder="Bathrooms" value={property.bathroom} onChange={(e) => setProperty({ ...property, bathroom: e.target.value })} />
            </div>
          </>
        )}
        {propertyType !== 'Land' && (
          <div className="propertyDetails-formGroup">
            <label className="propertyDetails-label" htmlFor="parking">Parking</label>
            <select id="parking" className="propertyDetails-input" onChange={(e) => setProperty({ ...property, parking: e.target.value })} value={property.parking}>
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="measurements">Measurements</label>
          <input type="text" id="measurements" className="propertyDetails-input" placeholder="Measurements" value={property.measurements} onChange={(e) => setProperty({ ...property, measurements: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="builtIn">Built In</label>
          <input type="text" id="builtIn" className="propertyDetails-input" placeholder="Built In" value={property.builtIn} onChange={(e) => setProperty({ ...property, builtIn: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="address">Address</label>
          <input type="text" id="address" className="propertyDetails-input" placeholder="Address" value={property.address} onChange={(e) => setProperty({ ...property, address: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="city">City</label>
          <input type="text" id="city" className="propertyDetails-input" placeholder="City" value={property.city} onChange={(e) => setProperty({ ...property, city: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="state">State</label>
          <input type="text" id="state" className="propertyDetails-input" placeholder="State" value={property.state} onChange={(e) => setProperty({ ...property, state: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="zip">Zip Code</label>
          <input type="text" id="zip" className="propertyDetails-input" placeholder="Zip Code" value={property.zipcode} onChange={(e) => setProperty({ ...property, zipcode: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="price">Price</label>
          <input type="number" id="price" className="propertyDetails-input" placeholder="Price" value={property.price} onChange={(e) => setProperty({ ...property, price: e.target.value })} />
        </div>
        <div className="propertyDetails-formGroup">
          <label className="propertyDetails-label" htmlFor="description">Description</label>
          <textarea id="description" className="propertyDetails-input" placeholder="Description" value={property.description} onChange={(e) => setProperty({ ...property, description: e.target.value })}></textarea>
        </div>
        <div className="propertyDetails-formGroup propertyDetails-formGroup-full">
          <label className="propertyDetails-label" htmlFor="uploadButton">Upload Photos</label>
          <input type="file" multiple onChange={(e) => setImageFiles([...e.target.files])} />
          <button type="button" id="uploadButton" className="propertyDetails-button" onClick={uploadImage}>Upload</button>
        </div>
         <div className="uploaded-images" style={{display:"flex",margin:"auto",padding:"20px"}}>
          {property.photo.map((url, index) => (
            <div key={index}  className="uploaded-image">
              <img src={url} height={100} width={100} alt={`Property ${index}`} className="uploaded-image-preview" />
              <button type="button" onClick={() => handleRemoveImage(url)}>Remove</button>
            </div>
          ))}
        </div>
        
        <button type="submit" className="propertyDetails-button">Submit</button>
      </form>
    </div>
  );
}

export default AddProperties;
