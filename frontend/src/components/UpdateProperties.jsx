import React, { useState, useEffect } from 'react';
import '../styles/UpdateProperties.css';
import ApiRequest from '../lib/ApiRequest';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'


function UpdateProperties() {
  const { id } = useParams(); // Use id from useParams
  const [property, setProperty] = useState({
    id: '',
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
    photo: [], // Updated to handle photo uploads as an array
    description: '',
    saleOrRent: ''
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await ApiRequest.get(`properties/view/${id}`); // Adjust endpoint as per your API
        if (response.data) {
          setProperty(response.data); // Assuming API response is JSON with property details
        }
      } catch (error) {
        toast.error('Error');
      }
    };

    fetchProperty();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const update = await ApiRequest.put(`properties/update/${id}`, property); // Adjust endpoint as per your API
      // Optionally, redirect or show a success message
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'e_state');

      try {
        const res = await axios.post('https://api.cloudinary.com/v1_1/dyivzqwl0/image/upload', formData);
        uploadedUrls.push(res.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    setProperty((prevProperty) => ({
      ...prevProperty,
      photo: [...prevProperty.photo, ...uploadedUrls]
    }));
  };

  const handleRemoveImage = (url) => {
    setProperty((prevProperty) => ({
      ...prevProperty,
      photo: prevProperty.photo.filter((photoUrl) => photoUrl !== url)
    }));
  };

  return (
    <div className="updateProperties-container">
      <h2 className="updateProperties-header">Update Property Details</h2>
      <form className="updateProperties-form" onSubmit={handleSubmit}>
        {/* Property Type */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="type">Property Type</label>
          <select id="type" name="type" className="updateProperties-input" value={property.type} onChange={handleInputChange}>
            <option value="">Select Property Type</option>
            <option value="House">House</option>
            <option value="Villa">Villa</option>
            <option value="Apartment">Apartment</option>
            <option value="Office">Office</option>
            <option value="Land">Land</option>
            <option value="Shop">Shop</option>
          </select>
        </div>

        {/* Sale or Rent */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="saleOrRent">For Rent or Sale</label>
          <select id="saleOrRent" name="saleOrRent" className="updateProperties-input" value={property.saleOrRent} onChange={handleInputChange}>
            <option value="">Select Option</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="bedroom">Number of Bedrooms</label>
          <input type="number" id="bedroom" name="bedroom" className="updateProperties-input" value={property.bedroom} onChange={handleInputChange} />
        </div>

        {/* Bathrooms */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="bathroom">Number of Bathrooms</label>
          <input type="number" id="bathroom" name="bathroom" className="updateProperties-input" value={property.bathroom} onChange={handleInputChange} />
        </div>

        {/* Measurements */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="measurements">Measurements</label>
          <input type="text" id="measurements" name="measurements" className="updateProperties-input" value={property.measurements} onChange={handleInputChange} />
        </div>

        {/* Built In */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="builtIn">Built In</label>
          <input type="text" id="builtIn" name="builtIn" className="updateProperties-input" value={property.builtIn} onChange={handleInputChange} />
        </div>

        {/* Parking */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="parking">Parking</label>
          <select id="parking" name="parking" className="updateProperties-input" value={property.parking} onChange={handleInputChange}>
            <option value="">Select Option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        {/* Address */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="address">Address</label>
          <input type="text" id="address" name="address" className="updateProperties-input" value={property.address} onChange={handleInputChange} />
        </div>

        {/* City */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="city">City</label>
          <input type="text" id="city" name="city" className="updateProperties-input" value={property.city} onChange={handleInputChange} />
        </div>

        {/* State */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="state">State</label>
          <input type="text" id="state" name="state" className="updateProperties-input" value={property.state} onChange={handleInputChange} />
        </div>

        {/* Zipcode */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="zipcode">Zip Code</label>
          <input type="text" id="zipcode" name="zipcode" className="updateProperties-input" value={property.zipcode} onChange={handleInputChange} />
        </div>

        {/* Price */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="price">Price</label>
          <input type="number" id="price" name="price" className="updateProperties-input" value={property.price} onChange={handleInputChange} />
        </div>

        {/* Description */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label" htmlFor="description">Description</label>
          <textarea id="description" name="description" className="updateProperties-input" value={property.description} onChange={handleInputChange}></textarea>
        </div>

        {/* Photo Upload */}
        <div className="updateProperties-formGroup">
          <label className="updateProperties-label">Upload New Photos</label>
          <input type="file" multiple onChange={handleFileChange} />
        </div>

        {/* Uploaded Images Preview */}
        <div className="uploaded-images" style={{display:"flex",margin:"auto",padding:"20px"}}>
          {property.photo.map((url, index) => (
            <div key={index}  className="uploaded-image">
              <img src={url} height={100} width={100} alt={`Property ${index}`} className="uploaded-image-preview" />
              <button type="button" onClick={() => handleRemoveImage(url)}>Remove</button>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button type="submit" className="updateProperties-button">Update Property</button>
      </form>
    </div>
  );
}

export default UpdateProperties;
