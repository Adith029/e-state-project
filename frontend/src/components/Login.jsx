/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'; // Remove useContext import
import '../styles/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import ApiRequest from '../lib/ApiRequest';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import { login } from '..//components/Redux/userSlice'; // Import login action from authSlice

function Login() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Initialize useDispatch hook

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiRequest.post("auth/loginuser", loginData);
      const token = response.data.token;
      const userData = response.data.data;

      // Save token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem("user", JSON.stringify(userData));

      // Dispatch login action to update Redux state
      dispatch(login(userData));

      toast.success('Logged In');
      const role = userData.role;

      if (role === "seller") {
        navigate('/seller');
      } else if (role === "buyer") {
        navigate('/user');
      } else {
        navigate('/admin');
      }
    } catch (error) {
      setError('Invalid email or password.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="login-container">
        <div className="bg-image"></div>
        <div className="login-modal">
          <div className="login-logo"></div>
          <div className="login-form">
            <div className="login-buttons">
              <Link to={'/login'}><button className="login-button">Login</button></Link>
              <Link to={'/register'}><button className="register-button">Register</button></Link>
            </div>
            <input
              type="email"
              placeholder="Email"
              className="login-input"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-input"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <button className="submit-button" type='submit'>LOGIN</button>
            <a href="#" className="forgot-password">Forgot your password?</a>
            {error && <p className="error-message">{error}</p>}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
