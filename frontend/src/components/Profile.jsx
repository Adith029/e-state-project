import React, { useState } from 'react';
import '../styles/Profile.css';
import ApiRequest from '../lib/ApiRequest';
import ButtonForUpdateRole from './ButtonForUpdateRole';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '..//components/Redux/userSlice.js'; // Import updateUser action
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const [image, setImage] = useState('');
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: currentUser.phone || '',
    password: '',
    confirmPassword: '',
    avatar: currentUser.photo || pic,
    becomeSeller: false,
  });

  const [isBecomeSeller, setIsBecomeSeller] = useState(false);

  const updateHandle = async (e) => {
    e.preventDefault();
    try {
      const formDataForUpdate = {
        ...formData,
        photo: formData.avatar,
        becomeSeller: isBecomeSeller.toString(),
      };

      const response = await ApiRequest.put(`user/update/${currentUser._id}`, formDataForUpdate);
      dispatch(updateUser(response.data)); // Dispatch updateUser action
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    }
  };

  const handleAvatarClick = () => {
    document.getElementById('avatar-input').click();
  };

  const uploadImage = async (e) => {
    e.preventDefault();
    const fData = new FormData();
    fData.append('file', image);
    fData.append('upload_preset', 'e_state');

    try {
      const res = await axios.post('https://api.cloudinary.com/v1_1/dyivzqwl0/image/upload', fData);
      setFormData({
        ...formData,
        avatar: res.data.secure_url,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profileContainer">
      <div className="profileContent">
        <form onSubmit={updateHandle}>
          <div className="profileHeader">
            <h2>Profile</h2>
          </div>
          <div className="profileDetails">
            <div style={{ marginTop: '60px' }}>
              {currentUser.role === 'buyer' ? <ButtonForUpdateRole setIsBecomeSeller={setIsBecomeSeller} /> : null}
            </div>
            <div className="avatar-container">
              <input
                type="file"
                accept="image/*"
                name="avatarFile"
                id="avatar-input"
                style={{ display: 'none' }}
                onChange={(e) => setImage(e.target.files[0])}
              />
              <img
                src={formData.avatar}
                alt="Avatar"
                className="avatar-preview"
                onClick={handleAvatarClick}
              />
              <button onClick={uploadImage}>Upload</button>
            </div>
          </div>
          <div className="login-form">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              className="register-input"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              className="register-input"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              className="register-input"
              onChange={handleChange}
            />
           
            <Button className="submit-button btn-primary" type="submit">
              Update
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
