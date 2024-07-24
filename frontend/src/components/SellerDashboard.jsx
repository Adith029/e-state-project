import React, { useContext, useState } from 'react';
import '../styles/SellerDashboard.css';
import { MdDashboard } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { CiSettings } from "react-icons/ci";
import { Button } from 'react-bootstrap';
import { IoIosLogOut } from "react-icons/io";
import AddProperties from './AddProperties';
import PropertyCard from './PropertyCard';
import Profile from './Profile';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './Chat/Chat';
import { Authentication } from '../Context/AuthContext';

function SellerDashboard() {
  const [activeLink, setActiveLink] = useState('myProperties');
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const { logout } = useContext(Authentication);

  const handleSetActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="seller-container-fluid">
      <div className="row-seller">
        <div className=" seller-sidebar bg-light">
          <div className="seller-profile text-center">
            <img src={currentUser.photo || pic} alt="Indica Watson" className="rounded-circle seller-profile-img" />
            <h5>{currentUser.name || "Name"}</h5>
          </div>
          <ul className="nav flex-column justify-self-center">
            <li className="seller-sidebar-elements">
              <a
                className={`seller-sidebar-link ${activeLink === 'myProperties' ? 'active' : ''}`}
                href="#"
                onClick={() => handleSetActiveLink('myProperties')}
              >
                <MdDashboard /> <span>My Properties</span>
              </a>
            </li>
            <li className="seller-sidebar-elements">
              <a
                className={`seller-sidebar-link ${activeLink === 'addProperties' ? 'active' : ''}`}
                href="#"
                onClick={() => handleSetActiveLink('addProperties')}
              >
                <FiMessageSquare /> <span>Add Properties</span>
              </a>
            </li>
            <li className="seller-sidebar-elements">
              <a
                className={`seller-sidebar-link ${activeLink === 'Inbox' ? 'active' : ''}`}
                href="#"
                onClick={() => handleSetActiveLink('Inbox')}
              >
                <FiMessageSquare /> <span>Inbox</span>
              </a>
            </li>
            <li className="seller-sidebar-elements">
              <a
                className={`seller-sidebar-link ${activeLink === 'profile' ? 'active' : ''}`}
                href="#"
                onClick={() => handleSetActiveLink('profile')}
              >
                <CiSettings /> <span>Settings</span>
              </a>
            </li>
          </ul>
          <div className="seller-logout-div">
          </div>
        </div>
        <div className=" seller-content">
          <div className="seller-property-list">
            {activeLink === 'myProperties' && <PropertyCard />}
            {activeLink === 'profile' && <Profile />}
            {activeLink === 'addProperties' && <AddProperties />}
            {activeLink === 'Inbox' && <Chat />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDashboard;
