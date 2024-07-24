import React, { useEffect, useState } from 'react';
import '../styles/ViewEnquiries.css';
import ApiRequest from '../lib/ApiRequest';
import { toast } from 'react-toastify'

function ViewEnquiries() {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await ApiRequest.get('/admin/viewEnquiry');
        setEnquiries(response.data.messages);
      } catch (error) {
        toast.error('Error');
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="viewEnquiries-container">
      <h1 className="viewEnquiries-header">Enquiry Messages</h1>
      <div className="viewEnquiries-list">
        {enquiries.map((messages) => (
          <div key={messages._id} className="viewEnquiries-item">
            <h2 className="viewEnquiries-name">{messages.name}</h2>
            <p className="viewEnquiries-email">Email: {messages.email}</p>
            <p className="viewEnquiries-mobile">Mobile: {messages.mobile}</p>
            <p className="viewEnquiries-message">{messages.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewEnquiries;
