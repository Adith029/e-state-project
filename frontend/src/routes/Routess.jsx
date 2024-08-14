import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavHeader from '../components/NavHeader'
import BodyPart from '../components/BodyPart'
import BodyPart2 from '../components/BodyPart2'
import BodyPart3 from '../components/BodyPart3'
import Footer from '../components/Footer'
import Login from '../components/Login'
import Register from '../components/Register'
import UserDashboard from '../components/UserDashboard'
import Properties from '../components/Properties'
import PropertyDetails from '../components/PropertyDetails'
import SellerDashboard from '../components/SellerDashboard'
import AdminDashboard from '../components/AdminDashboard'
import AboutUs from '../components/AboutUs'
import Contact from '../components/Contact'
import ScrollTop from '../components/ScrollTop'
import AddProperties from '../components/AddProperties'
import { AuthProvider } from '../Context/AuthContext'
import UpdateProperties from '../components/UpdateProperties'
import { SocketContextProvider } from '../Context/SocketContext'
import ChatBox from '../components/Chat/ChatBox'
import {ToastContainer} from 'react-toastify'
import { Provider } from 'react-redux'
import store from '../components/Redux/store'
import UserDetails from '../components/UserDetails'





function Routess () {
  return ( 
  
    <BrowserRouter>
    <Provider store={store}>
    <AuthProvider>
    <SocketContextProvider>
    <ScrollTop/>
    <NavHeader/>
    <Routes>
    <Route path='/' element={<><BodyPart/><BodyPart2/><BodyPart3/></>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/user' element={<UserDashboard/>}/>
    <Route path='/properties' element={<Properties/>}/>
    <Route path='/properties/details/:id' element={<PropertyDetails/>}/>
    <Route path='/seller' element={<SellerDashboard/>}/>
    <Route path='/admin' element={<AdminDashboard/>}/>
    <Route path='/about' element={<AboutUs/>}/>
    <Route path='/contact' element={<Contact/>}/>
    <Route path='/addproperties' element={<AddProperties/>}/>
    <Route path="/chatbox/:sellerId" element={<ChatBox/>} />
    <Route path='/updateProperties/:id' element={<UpdateProperties/>}/>
    <Route path='/userDetails/:id' element={<UserDetails/>}/>
    </Routes>
    <Footer/>
   
    </SocketContextProvider>
     </AuthProvider>
    <ToastContainer/>
    </Provider>
    </BrowserRouter>
    

  )
}

export default Routess