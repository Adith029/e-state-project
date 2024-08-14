import React, { useEffect, useState } from 'react';
import '../styles/DoneDealList.css';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';

function DoneDealList() {
  const [doneDeals, setDoneDeals] = useState([]);

  const fetchDoneDeals = async () => {
    try {
      const response = await ApiRequest.get('/doneDeals/view');
      setDoneDeals(response.data);
    } catch (error) {
      alert(error)
    }
  };

  useEffect(() => {
    fetchDoneDeals();
  }, []);

  return (
    <div className="done-deal-list">
      {doneDeals.map((doneDeal, index) => (
        <div className="done-deal-item d-flex" key={index}>
          <img src={doneDeal.details.photo[0] || pic} alt="Done Deal Property" className="done-deal-img" />
          <div className="done-deal-details d-flex flex-column justify-content-between">
            <div>
              <h1>{doneDeal.details.type}</h1>
              <p>{doneDeal.details.address}</p>
              <p>{doneDeal.details.city}, {doneDeal.details.state}, {doneDeal.details.zipcode}</p>
              <p>Price: ${doneDeal.details.price}</p>
            </div>
            <div>
                <h1>Sold by : {doneDeal.details.name}</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoneDealList;
