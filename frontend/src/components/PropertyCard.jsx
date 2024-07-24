// PropertyCard.js
import React, { useEffect, useState } from 'react';
import '../styles/PropertyCard.css';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify'

function PropertyCard() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);

  const fetchData = async () => {
    try {
      const response = await ApiRequest.get('properties/view');
      setProperties(response.data);
    } catch (error) {
      toast.error('Error');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deletehandle = async (id) => {
    try {
      await ApiRequest.delete(`/properties/delete/${id}`);
      setProperties((prevProperty) => prevProperty.filter(property => property._id !== id));
    } catch (error) {
      toast.error('Error');
    }
  };

  const markAsSold = async (id) => {
    try {
      await ApiRequest.post(`/doneDeals/properties/${id}`);
      setProperties((prevProperty) => prevProperty.filter(property => property._id !== id));
    } catch (error) {
      toast.error('Error');
    }
  };

  const renderStars = (averageRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          color={i <= averageRating ? '#ffc107' : '#e4e5e9'}
        />
      );
    }
    return stars;
  };

 

  return (
    <div className="property-list">
      {properties.map((item, index) => {
        const totalRatings = item.ratings ? item.ratings.length : 0;
        const averageRating = totalRatings > 0
          ? item.ratings.reduce((sum, rating) => sum + rating.star, 0) / totalRatings
          : 0;

        return (
          <div className="seller-property-item" key={index}>
            <img src={item.photo.length > 0 ? item.photo[0] : pic} alt="Property" className="seller-property-img" />
            <div className="seller-property-details">
              <h3>{item.name}</h3>
              <h1>${item.price}</h1>
              <p>{item.address}, {item.city} {item.state} {item.zipcode}</p>
              <p>{item.measurements} ft² <span className="mx-2">{item.bedroom} 🛏️</span> <span>{item.bathroom} 🛁</span></p>
              <div className="property-rating">
                {renderStars(averageRating)}
                <span> ({isNaN(averageRating) ? '0.0' : averageRating.toFixed(1)})</span>
              </div>
              <div className="seller-property-buttons">
                <button className="btnn" onClick={() => { deletehandle(item._id) }}>Delete</button>
                {currentUser && currentUser.role === 'seller' && (
                  <>
                    <button className="btnn2" onClick={() => navigate(`/updateProperties/${item._id}`)}>Edit</button>
                    <button className="btnn3" onClick={() => markAsSold(item._id)}>Mark as Sold</button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PropertyCard;
