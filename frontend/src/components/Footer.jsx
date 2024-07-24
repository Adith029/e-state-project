/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import '../styles/Footer.css'
import { Link, useNavigate } from 'react-router-dom'
import { CiFacebook } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";





function Footer() {

  const navigate = useNavigate()
  return (
    <footer className="footer-container">
      <div className="newsletter">
        <h2 className="newsletter-title">Join Our Newsletter Now</h2>
        <p className="newsletter-subtitle">Register now to get updates on promotions...</p>
        <div className="newsletter-input">
        <Link to={'/contact'}>  <button>SUBSCRIBE</button> </Link>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section footer-branding">
          <h3 className="footer-logo"><span style={{fontSize:"40px"}}>e</span>-State</h3>
          <p className="footer-description" style={{textAlign:"left"}}>
          E-State is an innovative online real estate app that simplifies property searching and management, providing users with comprehensive listings and seamless transaction capabilities. With user-friendly features and real-time updates, E-State ensures a smooth and efficient experience for both buyers and sellers.          </p>
          <div className="footer-social">
            <a href="https://www.facebook.com/"><CiFacebook /></a>
            <a href="https://www.instagram.com/"><FaInstagram /></a>
            <a href="https://www.linkedin.com/"><FaLinkedin /></a>
            <a href="https://x.com/"><BsTwitterX />
</a>
          </div>
        </div>

        <div className="footer-section footer-links">
          <h4>Quick Links</h4>
          <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Services</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-services">
          <h4>Services</h4>
          <ul>
             <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/contact">Enqury</Link></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4>Contact</h4>
          <p>124 Brooklyn, New York</p>
          <p>United States</p>
          <p>+11 2 3456 7890</p>
          <p>info@houzing.com</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright e-state 2024 All Right Reserved.</p>
        <p>
        <Link to="/about">Terms Of Use</Link> | <Link to="/about">Privacy Policy</Link>

        </p>
      </div>
    </footer>
  )
}

export default Footer