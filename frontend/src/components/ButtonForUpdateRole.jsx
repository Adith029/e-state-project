import React from 'react';
import  '../styles/ButtonForUpdateRole.css';
import { Button } from 'react-bootstrap';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ButtonForUpdateRole = ({ setIsBecomeSeller }) => {
  const handleClick = () => {
    setIsBecomeSeller(true);
    toast.success('Request Sent Successfully');
  };

  return (
    <div>
      <Button className='becomeAgent' onClick={handleClick}>Become An Agent</Button>
    </div>
  );
};

export default ButtonForUpdateRole;
