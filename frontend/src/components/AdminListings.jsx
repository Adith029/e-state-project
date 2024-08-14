import React from 'react'
import '../styles/AdminListings.css'
import { IoBedOutline } from "react-icons/io5";
import { FaBath } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function AdminListings() {
  return (
    <div className="new-property-admin-list">
    <div className="new-property-admin-item d-flex">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbcrj53mGyk-u4JwrIb6z1RBAeCpxR78gfQ&s" alt="Property" className="new-property-admin-img" />
        <div className="new-property-admin-details d-flex flex-column justify-content-between">
            <div>
                <h3>The Stables</h3>
                <h1>$9540.99</h1>
                <p>Terry Lane, Golden CO 80403</p>
                <p>230.5 m² <span className="mx-2">2 <IoBedOutline/></span> <span>2 <FaBath/></span></p>
            </div>
        </div>
        <div>
   <Link to={'/properties/details'}><button className="btn btn-outline-primary align-self-end">View Details</button></Link>
   <button className="btn btn-outline align-self-end btn2">Remove</button>
   </div>
    </div>
</div>
  )
}

export default AdminListings