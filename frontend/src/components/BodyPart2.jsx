import React from 'react'
import image1 from '../Assets/Your Images Here.png'
import '../styles/BodyPart2.css'
import { PiBuildingApartmentThin } from "react-icons/pi";
import { FaArrowRightLong } from "react-icons/fa6";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link } from 'react-router-dom';

function BodyPart2() {
  return (
    <div className="bodyPart2Container">
      <img src={image1} alt="" className='bodypart2image' />
      <div className='aboutUs'>
        <p className='aboutUsTitle'>ABOUT US</p>
        <h2 className='aboutUsHeading'>We're on a Mission to Change <br />
          View of RealEstate Field.</h2>
        <p className='aboutUsDescription'>We're transforming the real estate industry with seamless, transparent, and innovative solutions. <br /> Experience unparalleled service and cutting-edge technology as you find your dream home with us.</p>
        <div className='modernHouse'>
          <div className='apartmentCard'>
            <PiBuildingApartmentThin color='#007bff' size={50} />
            <p><b>Modern Apartments</b></p>
            <p className='cardDescription'>Discover Trendy Apartments with <br />Cutting-Edge Designs!</p>
          </div>
          <div className='apartmentCard'>
            <VscWorkspaceTrusted color='#007bff' size={50} />
            <p><b>Trusted Agents</b></p>
            <p className='cardDescription'>Connect with Trusted Real-Estate <br /> Agents and Brokers!</p>
          </div>
        </div>
        <Link to={'/about'} >
          <p className='learnMore'><FaArrowRightLong color='007bff'/> Learn more</p>
        </Link>
      </div>
    </div>
  )
}

export default BodyPart2
