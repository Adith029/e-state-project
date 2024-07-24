import React, { useState, useEffect } from 'react';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/RatePost.css'
import { FaStar } from 'react-icons/fa';
import ApiRequest from '../lib/ApiRequest'; // Ensure correct path to ApiRequest

const RatePost = ({ postId, token }) => {
    const [star, setStar] = useState(0);
    const [averageRating, setAverageRating] = useState(0);
    const [totalRatings, setTotalRatings] = useState(0);

    const fetchRatings = async () => {
        try {
            const response = await ApiRequest.get(`/properties/view/${postId}`);
            const ratings = response.data.ratings;
            const total = ratings.length;
            const sum = ratings.reduce((accumulator, current) => accumulator + current.star, 0);
            const average = total > 0 ? sum / total : 0;
            setAverageRating(average);
            setTotalRatings(total);
        } catch (error) {
            toast.error('Error');
        }
    };

    useEffect(() => {
        fetchRatings();
    }, []);

    const handleRating = async (rating) => {
        try {
            const response = await ApiRequest.put('/properties/rating', 
            {
                star: rating,
                postId
            });
            toast.success("Rating submitted successfully!");
            fetchRatings(); // Update the ratings after submission
            setStar(rating); // Update the local state of star to reflect current user rating
        } catch (error) {
          toast.error("Error submitting rating.");
        }
    };

    // Function to render star icons for rating selection
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    onClick={() => handleRating(i)}
                    style={{
                        cursor: 'pointer',
                        color: i <= star ? '#ffc107' : '#e4e5e9',
                        height:"30px",width:"30px",
                        textAlign:'left'
                    }}
                />
            );
        }
        return stars;
    };

    return (
        <div style={{marginTop:"30px"}}>
            <h3 style={{textAlign:'left'}}>Rate this Property</h3>
           
            <div style={{justifyContent:'left',textAlign:'left',marginTop:'10px',marginLeft:'30px'}}>
                {renderStars()}
            </div>
            <div>
                {/* <p>Average Rating: {averageRating.toFixed(1)} ({totalRatings} {totalRatings === 1 ? 'rating' : 'ratings'})</p> */}
            </div>
           
        </div>
    );
};

export default RatePost;
