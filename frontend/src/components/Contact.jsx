import React, { useState } from 'react'
import '../styles/Contact.css'
import ApiRequest from '../lib/ApiRequest'
import { toast } from 'react-toastify';

function Contact() {
  const [enquiry, setEnquiry] = useState({ name: "", email: "", mobile: "", message: "" });

  const handSubmit = async (e) => {
    e.preventDefault();
    try {
      const messages = await ApiRequest.post('/contact/send', enquiry);
      toast.success("Enquiry Sent")
    } catch (error) {
      return console.log(error);
    }
  }

  return (
    <form onSubmit={handSubmit}>
      <div className="contactUs-container">
        <div className="contactUs-formSection">
          <h1 className="contactUs-header">Contact Us</h1>
          <div className="contactUs-form">
            <div className="contactUs-row">
              <div className="contactUs-column">
                <label className="contactUs-label" htmlFor="firstName">Name</label>
                <input className="contactUs-input" type="text" id="firstName" placeholder="Enter Your Name" value={enquiry.name} onChange={(e) => { setEnquiry({ ...enquiry, name: e.target.value }) }} />
              </div>
            </div>
            <div className="contactUs-row">
              <div className="contactUs-column">
                <label className="contactUs-label" htmlFor="email">Email</label>
                <input className="contactUs-input" type="email" id="email" placeholder="name@mail.com" value={enquiry.email} onChange={(e) => { setEnquiry({ ...enquiry, email: e.target.value }) }} />
              </div>
              <div className="contactUs-column">
                <label className="contactUs-label" htmlFor="mobile">Mobile No.</label>
                <input className="contactUs-input" type="tel" id="mobile" placeholder="9999999999" value={enquiry.mobile} onChange={(e) => { setEnquiry({ ...enquiry, mobile: e.target.value }) }} />
              </div>
            </div>
            <div className="contactUs-row">
              <div className="contactUs-column-full">
                <label className="contactUs-label" htmlFor="message">Message</label>
                <textarea className="contactUs-textarea" id="message" placeholder="Enter your Message" value={enquiry.message} onChange={(e) => { setEnquiry({ ...enquiry, message: e.target.value }) }}></textarea>
              </div>
            </div>
            <button className="contactUs-button" type="submit">
              <span className="contactUs-buttonIcon"></span> Send
            </button>
          </div>
        </div>
        <div className="contactUs-mapSection">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3912.2221152189345!2d75.82387821480146!3d11.25648799202847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65ab7f54ec4fd%3A0xb7b536e2e51621de!2sHiLITE%20Business%20Park%2C%20Calicut%2C%20Kerala!5e0!3m2!1sen!2sin!4v1628170535154!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title='abc'
          ></iframe>
        </div>
      </div>
    </form>
  )
}

export default Contact;
