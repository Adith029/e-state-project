/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../styles/Register.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'


function Register() {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    role: 'buyer'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!registerData.name) errors.name = "Name is required";
    if (!registerData.email) errors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(registerData.email)) errors.email = "Email address is invalid";
    if (!registerData.password) errors.password = "Password is required";
    if (registerData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (registerData.password !== registerData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!registerData.phone) errors.phone = "Phone number is required";
    if (!/^\d{10}$/.test(registerData.phone)) errors.phone = "Phone number is invalid";
    if (!registerData.city) errors.city = "City is required";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors);

    if (Object.keys(errors).length !== 0) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/auth/add/user', registerData);
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      toast.error('Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="bg-image"></div>
        <div className="login-modal">
          <div className="login-form">
            <div className="register-buttons"></div>
            <input
              type="text"
              placeholder="Name"
              className="register-input"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
            />
            {errors.name && <span className="error">{errors.name}</span>}

            <input
              type="email"
              placeholder="Email"
              className="register-input"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            {errors.email && <span className="error">{errors.email}</span>}

            <input
              type="password"
              placeholder="Password"
              className="register-input"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            {errors.password && <span className="error">{errors.password}</span>}

            <input
              type="password"
              placeholder="Confirm Password"
              className="register-input"
              value={registerData.confirmPassword}
              onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}

            <input
              type="number"
              placeholder="Phone"
              className="register-input"
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
            />
            {errors.phone && <span className="error">{errors.phone}</span>}

            <input
              type="text"
              placeholder="City"
              className="register-input"
              value={registerData.city}
              onChange={(e) => setRegisterData({ ...registerData, city: e.target.value })}
            />
            {errors.city && <span className="error">{errors.city}</span>}

            <button type="submit" className="submit-button">Register</button>
            <Link to={'/login'}>
              <a href="#" className="forgot-password">Already have an account?</a>
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Register;
