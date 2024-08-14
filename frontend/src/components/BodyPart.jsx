import React from 'react';
import '../styles/BodyPart.css';
import image from '../Assets/todd-kent-178j8tJrNlc-unsplash 1.png';
import { Button } from 'react-bootstrap';
// import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

function BodyPart() {
  return (
    <div>
    <div style={{ backgroundColor: '#F4F9FF', minHeight: '780px', display: 'flex', flexDirection: 'row', alignItems: 'center', padding: '20px' }}>
    <div className="discoverDiv">
     
      <div className="discoverPara">
         <p className="discover">Discover A Place <br /> You'll Love To Live</p>
      Discover Your Dream Home in the Heart of the City. <br /> This elegant residence offers unparalleled luxury and comfort. <br />
      Perfectly located for convenient access to urban amenities and serene parks.
      <br /> <br />
      <Link to={'/contact'}> <Button variant="primary" className="makeInquiry">Make An Enquiry</Button></Link>
    </div>
    </div>
    
    <div className="house1">
      <img src={image} alt="House" />
    </div>
    </div>
   
  </div>
  
  )
}  

export default BodyPart;
