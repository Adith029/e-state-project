import React, { useContext, useState } from 'react';
import '../styles/UserDashboard.css';
import { BsFillHouseFill } from "react-icons/bs";
import { FiMessageSquare } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import { IoIosLogOut } from "react-icons/io";
import FavoriteProperties from './FavoriteProperties';
import Profile from './Profile';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch from Redux
import { Authentication } from '../Context/AuthContext'; // Import logout context
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import Chat from './Chat/Chat';

function UserDashboard() {
  const [activeLink, setActiveLink] = useState('favorites');
  const currentUser = useSelector(state => state.auth.currentUser); // Access currentUser from Redux store
  const dispatch = useDispatch(); // Initialize useDispatch hook
  const { logout } = useContext(Authentication); // Get logout function from context

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 sidebar bg-light">
          <div className="profile text-center">
            <img src={currentUser.photo || pic} alt="Profile" className="rounded-circle profile-img" />
            <h5>{currentUser.name || "Name"}</h5>    
          </div>
          <ul className="nav flex-column">
            <li className="sidebar-elements">
              <button
                className={classNames('sidebar-link', { active: activeLink === 'favorites' })}
                onClick={() => handleSetActiveLink('favorites')}
              >
                <BsFillHouseFill /> Favorites
              </button>
            </li>
            <li className="sidebar-elements">
              <button
                className={classNames('sidebar-link', { active: activeLink === 'Inbox' })}
                onClick={() => handleSetActiveLink('Inbox')}
              >
                <FiMessageSquare /> Inbox <span className="badge badge-primary">3</span>
              </button>
            </li>
            <li className="sidebar-elements">
              <button
                className={classNames('sidebar-link', { active: activeLink === 'profile' })}
                onClick={() => handleSetActiveLink('profile')}
              >
                <CiSettings /> Profile
              </button>
            </li>
          </ul>
          <div className="logout-div">
          </div>
        </div>
        <div className="col-md-10 content">
          <div className="property-list">
            {activeLink === 'favorites' && <FavoriteProperties />}
            {activeLink === 'profile' && <Profile />}
            {activeLink === 'Inbox' && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
