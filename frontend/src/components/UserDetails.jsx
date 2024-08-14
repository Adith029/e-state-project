import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ApiRequest from '../lib/ApiRequest';
import { useNavigate, useParams } from 'react-router-dom';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import '../styles/PropertyDetails.css';

function UserDetails() {
    const [user, setUser] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await ApiRequest.get(`/user/viewById/${id}`);
            setUser(response.data);
        } catch (error) {
            toast.error('Error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container-fluid new-property-card">
            <div className="row">
                <div className="col-md-7">
                    <img style={{ height: "500px" }}
                        src={(user && user.photo) ? user.photo : pic}
                        alt="User"
                        className="img-fluid new-property-main-img"
                    />
                </div>
                <div className="col-md-4 new-property-pro-details">
                    <h1>{user ? user.name : "Loading..."}
                        <span style={{ backgroundColor: 'orange', color: 'white', fontSize: '16px' }}>
                            {user ? (user.role === "seller" ? "Seller" : "User") : ""}
                        </span>
                    </h1>
                    <h2>{user ? user.city : "Loading..."}</h2>
                    <p style={{textAlign:"left"}}>Email: <b>{user ? user.email : "Loading..."}</b></p>
                    <p style={{textAlign:"left"}}>Phone: <b>{user ? user.phone : "Loading..."}</b></p>
                    <hr />
                </div>
            </div>
        </div>
    );
}

export default UserDetails;
