import React, { useEffect, useState } from 'react';
import '../styles/UserList.css';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import { toast } from 'react-toastify';

function UserList() {

  const [ users, setUser] = useState([])

  const data = async()=>{
    try {
      const user = await ApiRequest.get('/admin/view/buyer')
      setUser(user.data)
    
    } catch (error) {
      toast.error('Error');
    }
  }
  
  
  useEffect(() => {
    data()
  }, [])

  const makeSeller =async (id)=>{
    try {
      const token = localStorage.getItem('token')
      const response = await ApiRequest.get(`/admin/approve/seller/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
         
        }
      })
      setUser(users.filter(seller => seller._id !== id));
      toast.success('Role Updated')
    console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await ApiRequest.delete(`/admin/delete/buyer/${id}`);
      toast.error('User Removed')
      console.log(response);
      setUser(users.filter(seller => seller._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="new-property-user-list">
      {users.map((item,index)=>(
    <div className="new-property-user-item d-flex">
        <img src={item.photo || pic} alt="Property" className="new-property-user-img" />
        <div className="new-property-user-details d-flex flex-column justify-content-between">
            <div>
                <h1>{item.name}</h1>
                <p>{item.email}<b></b></p>
                <p>{item.becomeSeller==="true"?"Requested For Seller Role":""}</p>
               
            </div>
        </div>
        <div>
   <button className="btn btn-outline-primary align-self-end" onClick={()=>makeSeller(item._id)}>Make Seller</button>
   <button className="btn btn-outline align-self-end btn2" onClick={()=>handleDelete(item._id)}>Remove</button>
   </div>
    </div>
    ))}
</div>
  )
}

export default UserList