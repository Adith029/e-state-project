import React, { useContext, useState } from 'react';
import '../styles/NavHeader.css';
import { useSelector } from 'react-redux'; // Import useSelector from Redux
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../Assets/3b9fcb095bfe879d76592786b10c7972-removebg-preview.jpg';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { Authentication } from '../Context/AuthContext';
import { FiLogOut } from "react-icons/fi";

function NavHeader() {
  const currentUser = useSelector(state => state.auth.currentUser); // Access currentUser from Redux store
  const navigate = useNavigate();
  const { logout } = useContext(Authentication);

  const [expanded, setExpanded] = useState(false);

  const handleLoginClick = () => {
    if (currentUser) {
      switch (currentUser.role) {
        case 'seller':
          navigate('/seller');
          break;
        case 'buyer':
          navigate('/user');
          break;
        case 'admin':
          navigate('/admin');
          break;
        default:
          navigate('/');
          break;
      }
    } else {
      navigate('/login');
    }
    setExpanded(false); // Close the navbar after clicking a link
  };

  return (
    <Navbar expand="lg" className='navbar' expanded={expanded}>
      <Container className='elements'>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" className="logo-image" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-center">
            <Link to='/' className="nav-link" onClick={() => setExpanded(false)}>Home</Link>
            <Link to='/properties' className="nav-link" onClick={() => setExpanded(false)}>Properties</Link>
            <Link to='/about' className="nav-link" onClick={() => setExpanded(false)}>About</Link>
            <Link to='/contact' className="nav-link" onClick={() => setExpanded(false)}>Contact</Link>
          </Nav>
          <button className='nav-link getstarted' onClick={handleLoginClick}>
            {currentUser ? currentUser.name : 'Login'}
          </button>
          {currentUser &&
            <div className="profile-container">
              <img src={currentUser.photo || pic} alt="Profile" className="profile-image" />
            </div>
          }
           {currentUser?<button onClick={logout} style={{marginLeft:"30px",backgroundColor:"none",borderRadius:"50%",border:"none",height:'40px',width:'40px'}}><FiLogOut style={{color:"red",height:'40px',width:'40px'}}/></button>:""}

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavHeader;
