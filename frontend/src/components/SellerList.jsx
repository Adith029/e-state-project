import React, { useEffect, useState } from 'react';
import '../styles/SellerList.css';
import { Link } from 'react-router-dom';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { toast } from 'react-toastify';

function SellerList() {
  const [sellers, setSellers] = useState([]); // Initialize as an empty array

  const data = async () => {
    try {
      const sellerResponse = await ApiRequest.get('/admin/view/seller');
      setSellers(sellerResponse.data);
    } catch (error) {
      toast.error('Error');
    }
  };

  useEffect(() => {
    data();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this seller?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token'); 
      await ApiRequest.delete(`/admin/delete/seller/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      toast.error("User Removed")
      setSellers(sellers.filter(seller => seller._id !== id));
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <div className="new-property-seller-list">
      {sellers.map((seller, index) => (
        <div className="new-property-seller-item d-flex" key={index}>
          <img src={seller.photo || pic} alt="Seller" className="new-property-seller-img" />
          <div className="new-property-seller-details d-flex flex-column justify-content-between">
            <div>
              <h1>{seller.name}</h1>
              <p>{seller.email}</p>
              <p>{seller.phone}</p>
            </div>
          </div>
          <div className="btn-container d-flex align-items-center">
            <Link to={`/userDetails/${seller._id}`}>
              <button className="btn btn-outline-primary">View Details</button>
            </Link>
            <button 
              className="btn btn-outline btn-danger ml-2" 
              onClick={() => handleDelete(seller._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SellerList;