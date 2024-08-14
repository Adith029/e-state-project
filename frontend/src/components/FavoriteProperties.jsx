import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import '../styles/FavoriteProperties.css';
import { FaStar } from 'react-icons/fa';

function FavoriteProperties() {
    const [favorites, setFavorites] = useState([]);

    const fetchData = async () => {
        try {
            const response = await ApiRequest('/properties/favorites');
            setFavorites(response.data);
        } catch (error) {
            alert(error)
        }
    };

    const deletehandle = async (id) => {
        try {
            const response = await ApiRequest.delete(`/user/deleteFromFavorites/${id}`);
            setFavorites((prevFavorites) => prevFavorites.filter((item) => item._id !== id));
            toast.success('Property removed from favorites!');
        } catch (error) {
            toast.error('Error removing property from favorites.');
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData when the component mounts
    }, []); // Empty dependency array ensures it only runs once on mount

    return (
        <div className="property-item-fav-1">
            {favorites.map((item) => (
                <div key={item._id} className="property-card">
                    <img src={!item.photo ? pic : item.photo[0]} alt="Property" className="property-img-fav-1" />
                    <div className="property-details-fav-1">
                        <div>
                            <h3>{item.name}</h3>
                            <h1>${item.price}</h1>
                            <p>{item.address}</p>
                            <p>
                                {item.measurements}ft²
                                 <span className="mx-2">{item.bedroom}🛏️</span>{' '}
                                <span>{item.bathroom} 🛁</span>
                                <br />
                                <p>Average Rating:{item.totalRatings}<FaStar style={{color:"yellow"}} /></p>
                            </p>
                            <br />
                            <Link to={`/properties/details/${item._id}`}>
                                <button className="btnView" style={{ backgroundColor: "blue", color: 'white' }}>View Details</button>
                            </Link>
                            <button className="btnView" style={{ backgroundColor: "red", color: 'white' }} onClick={() => deletehandle(item._id)}>Remove</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FavoriteProperties;