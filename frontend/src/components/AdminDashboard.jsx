import React, { useContext } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import SellerList from './SellerList'
import UserList from './UserList'
import ViewEnquiries from './ViewEnquires'
import { Authentication } from '../Context/AuthContext'
import DoneDealList from './DoneDealList'

function AdminDashboard() {
  return (
    <div>
    <Tabs
   
    id="justify-tab-example"
    className="mb-3"
    justify
  >
    <Tab eventKey="home" title="Buyers">
      <UserList/>
    </Tab>
    <Tab eventKey="longer-tab" title="Sellers">
      <SellerList/>
    </Tab>
    <Tab eventKey="enquiry" title="Enquiry">
      <ViewEnquiries/>
    </Tab>
    <Tab eventKey="reports" title="Reports">
      <DoneDealList/>
    </Tab>
  </Tabs> 
  </div>
   )
}

export default AdminDashboard