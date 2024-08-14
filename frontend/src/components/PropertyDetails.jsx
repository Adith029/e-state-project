import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoBedOutline } from "react-icons/io5";
import { BsHouseDoorFill } from "react-icons/bs";
import { FaBath, FaCar, FaStar } from 'react-icons/fa';
import { BiArea } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import ApiRequest from '../lib/ApiRequest';
import { useNavigate, useParams } from 'react-router-dom';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import RatePost from './RatePost'; // Import RatePost component
import '../styles/PropertyDetails.css'

function PropertyDetails() {
    const [selectedImage, setSelectedImage] = useState('');
    const [property, setProperty] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const images = [
        pic, pic, pic, pic
    ];

    const fetchData = async () => {
        try {
            const response = await ApiRequest.get(`properties/view/${id}`);
            const totalRatings = response.data.ratings ? response.data.ratings.length : 0;
            const averageRating = totalRatings > 0
                ? response.data.ratings.reduce((sum, rating) => sum + rating.star, 0) / totalRatings
                : 0;
            setProperty({ ...response.data, averageRating, totalRatings });
        } catch (error) {
            toast.error('Error');
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const addToFavorites = async () => {
        try {
            const response = await ApiRequest.post(`/user/addToFavorites/${id}`);
            toast.success("Added to favorites!");
        } catch (error) {
            toast.error("Failed to add to favorites.");
        }
    };

    const createChat = async (id) => {
        try {
            const res = await ApiRequest.post(`chat/add`, { receiverId: id });
            navigate(`/chatbox/${res.data._id}`);
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
        <div className="container-fluid new-property-card">
            <div className="row">
                <div className="col-md-7">
                    <img style={{ height: "500px" }}
                        src={selectedImage || (property && property.photo[0] ? property.photo[0] : pic)}
                        alt="Property"
                        className="img-fluid new-property-main-img"
                    />
                    <div className="new-property-thumbnails">
                        {property && property.photo ? property.photo.map((item, index) => (
                            <img
                                key={index}
                                src={item || pic}
                                alt={`Thumbnail ${index + 1}`}
                                className="img-thumbnail new-property-thumb"
                                onClick={() => setSelectedImage(item || pic)}
                            />
                        )) : images.map((item, index) => (
                            <img
                                key={index}
                                src={item || pic}
                                alt={`Thumbnail ${index + 1}`}
                                className="img-thumbnail new-property-thumb"
                                onClick={() => setSelectedImage(item || pic)}
                            />
                        ))}
                    </div>
                </div>
                <div className="col-md-4 new-property-pro-details">
                    <h1>$ {property ? `${property.price} ${property.saleOrRent === "Rent" ? "/ month" : ""}` : "Loading..."}
                        <span style={{ backgroundColor: 'orange', color: 'white', fontSize: '16px' }}>
                            {property ? (property.saleOrRent === "Rent" ? "For Rent" : "For Sale") : ""}
                        </span>
                    </h1>
                    <h2>{property ? property.address : "Loading..."}</h2>
                    <p style={{textAlign:"left"}}>Listed By :<b> {property.name}</b></p>
                    <hr />
                   
                    {property ? (
                        <div className="row overview-d">
                            <div className="col-6">
                                <h3><IoBedOutline /> Bedroom: {property.bedroom}</h3>
                            </div>
                            <div className="col-6">
                                <h3><BsHouseDoorFill /> Type: {property.type}</h3>
                            </div>
                            <div className="col-6">
                                <h3><FaBath className="text-danger" /> Bath: {property.bathroom}</h3>
                            </div>
                            <div className="col-6">
                                <h3><FaCar /> Parking: {property.parking ? "Yes" : "No"}</h3>
                            </div>
                            <div className="col-6">
                                <h3><BiArea /> Sqft: {property.measurements}ft²</h3>
                            </div>
                            <div className="col-6">
                                <h3><BsCalendar /> Build Year: {property.builtIn}</h3>
                            </div>
                            <div>
                                <div className="new-property-rating">
                                    {renderStars(property.averageRating)}
                                    <span> ({isNaN(property.averageRating) ? '0.0' : property.averageRating.toFixed(1)})</span>
                                </div>
                            </div>
                        </div>
                    ) : <p>Loading details...</p>}
                    <div style={{ display: 'block', marginTop: '55px' }}>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <button className='add-favorites' style={{ textWrap: 'nowrap', marginLeft: '20px' }} onClick={addToFavorites}> Add To Favorites</button>
                            <button style={{ textWrap: 'nowrap' }} className='add-favorites' onClick={() => createChat(property.owner._id)}>Contact Seller</button>
                        </div>
                        <RatePost postId={id} />
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default PropertyDetails;
