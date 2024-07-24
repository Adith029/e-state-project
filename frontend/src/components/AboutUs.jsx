import React from 'react';
import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="aboutUs-container">
      <img src="https://i.pinimg.com/564x/df/e4/b6/dfe4b645a70e18ed4b2e660087670a7e.jpg" width={200} height={200} alt="" />
      <h1 className="aboutUs-header">About Us</h1>
      <div className="aboutUs-descriptionContainer">
        <p className="aboutUs-description">
          Welcome to e-state Marketplace, your premier source for buying, selling, and renting properties. We are dedicated to making real estate transactions seamless and accessible for everyone. Our mission is to simplify the process of finding and securing your ideal home or investment property, ensuring a smooth and stress-free experience. Whether you are in the market for your dream home, looking to sell your current property, or seeking a promising investment opportunity, DreamHomes Marketplace is here to support you. We understand that real estate decisions are significant and can be overwhelming, which is why our team of experts is committed to providing you with the guidance and resources you need. Explore our extensive listings and let us help you navigate the exciting journey of real estate. At DreamHomes Marketplace, your real estate dreams are within reach.
        </p>
      </div>
      <div className="aboutUs-values">
        <h2 className="aboutUs-subheader">Our Values</h2>
        <ul className="aboutUs-valuesList">
          <li className="aboutUs-valueItem">
            <img src="https://i.pinimg.com/564x/53/55/f2/5355f2368ef39bb2f116c7f943bccfc3.jpg" alt="Transparency" className="aboutUs-valueImage" />
            Transparency
          </li>
          <li className="aboutUs-valueItem">
            <img src="https://i.pinimg.com/564x/14/47/c3/1447c3dde903d7ac5681ca2e774a3411.jpg" alt="Integrity" className="aboutUs-valueImage" />
            Integrity
          </li>
          <li className="aboutUs-valueItem">
            <img src="https://i.pinimg.com/564x/17/cc/40/17cc40f312be14c8a2450af2063ed62d.jpg" alt="Customer Focus" className="aboutUs-valueImage" />
            Customer Focus
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutUs;
