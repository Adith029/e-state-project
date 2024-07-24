/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useEffect, useState } from 'react'
import '../styles/BodyPart3.css'
import { Col, Container, Row } from 'react-bootstrap';
import { PiHouseLineLight } from "react-icons/pi";
import { GiHouse } from "react-icons/gi";
import { LiaBuildingSolid } from "react-icons/lia";
import { BiBuildingHouse } from "react-icons/bi";
import { MdHolidayVillage } from "react-icons/md";
import { PiBuildingApartmentFill } from "react-icons/pi";
import { RiHomeOfficeFill } from "react-icons/ri";
import { GiIsland } from "react-icons/gi";
import { CiShop } from "react-icons/ci";
import ApiRequest from '../lib/ApiRequest';
import { Link, useNavigate } from 'react-router-dom';


function BodyPart3() {

    const [agentsData, setAgentsData] = useState([]);
    const [listings, setListings] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(6); // Number of items per page
    const navigate = useNavigate();

    const data = async () => {
        try {
            const sellerResponse = await ApiRequest.get('/admin/view/seller');
            setAgentsData(sellerResponse.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        data();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await ApiRequest.get('properties/viewAll');
            setListings(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Calculate the current listings to display
    const indexOfLastListing = currentPage * itemsPerPage;
    const indexOfFirstListing = indexOfLastListing - itemsPerPage;
    const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className="app-container">
            <header className="app-header">
                <h6 className="app-subtitle">OUR SERVICES</h6>
                <h1 className="app-title">Our Main Focus</h1>
            </header>

            <main>
                <section className="main-focus">
                    <div className="focus-item">
                        <div className="icon"><PiHouseLineLight color='#007bff' size={50} /></div>
                        <h3 className="focus-title" style={{ textAlign: "center" }}>Buy a Home</h3>
                        <p className="focus-description">
                            Over 1 million homes for sale available on the website, we can match you with a house you will want to call home.
                        </p>
                        <Link to={'/properties'} className="focus-link">Find A Home →</Link>
                    </div>
                    <div className="focus-item">
                        <div className="icon"><GiHouse color='#007bff' size={50} /></div>
                        <h3 className="focus-title" style={{ textAlign: "center" }}>Rent a Home</h3>
                        <p className="focus-description">
                            Over 1 million homes for sale available on the website, we can match you with a house you will want to call home.
                        </p>
                        <Link to={'/properties'} className="focus-link">Rent A Home →</Link>
                    </div>
                    <div className="focus-item">
                        <div className="icon"><LiaBuildingSolid color='#007bff' size={50} /></div>
                        <h3 className="focus-title" style={{ textAlign: "center" }}>Sell a Home</h3>
                        <p className="focus-description">
                            Over 1 million homes for sale available on the website, we can match you with a house you will want to call home.
                        </p>
                        <Link to={'/login'} className="focus-link">Sell A Home →</Link>
                    </div>
                </section>

                <section className="featured-categories">
                    <div className="categories-header">
                        <h2 className="categories-title">Featured Categories</h2>
                        <p className="categories-subtitle">Lorem ipsum dolor sit amet</p>
                        <Link to={'/properties'} className="categories-link">View All Categories →</Link>
                    </div>
                    <div className="categories">
                        <div className="category-item">
                            <div className="category-icon"><BiBuildingHouse color='#007bff' size={50} /></div>
                            <h3 className="category-title">Town House</h3>
                            <p className="category-description">2 Properties</p>
                        </div>
                        <div className="category-item">
                            <div className="category-icon"><MdHolidayVillage color='#007bff' size={50} /></div>
                            <h3 className="category-title">Modern Villa</h3>
                            <p className="category-description">10 Properties</p>
                        </div>
                        <div className="category-item">
                            <div className="category-icon"><PiBuildingApartmentFill color='#007bff' size={50} /></div>
                            <h3 className="category-title">Apartment</h3>
                            <p className="category-description">3 Properties</p>
                        </div>
                        <div className="category-item">
                            <div className="category-icon"><RiHomeOfficeFill color='#007bff' size={50} /></div>
                            <h3 className="category-title">Office</h3>
                            <p className="category-description">3 Properties</p>
                        </div>
                        <div className="category-item">
                            <div className="category-icon"><GiIsland color='#007bff' size={50} /></div>
                            <h3 className="category-title">Land</h3>
                            <p className="category-description">5 Properties</p>
                        </div>
                        <div className="category-item">
                            <div className="category-icon"><CiShop color='#007bff' size={50} /></div>
                            <h3 className="category-title">Shop House</h3>
                            <p className="category-description">2 Properties</p>
                        </div>
                    </div>
                </section>
            </main>
            <section className="agents-section">
                <h2>Our Growing Agents</h2>
                <div className="agents-grid">
                    {agentsData.slice(0, 4).map((agent, index) => (
                        <div key={index} className="agent-card">
                            <img src={agent.photo} alt={agent.name} style={{ height: "200px" }} />
                            <div className="agent-info">
                                <span className="agent-experience">{agent.experience}</span>
                                <h3>{agent.name}</h3>
                                <p>{agent.email}</p>
                                <p>Call: {agent.phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="become-agent-section">
                <h2>Become An Agent</h2>
                <p>Agent hen an unknown printer took a galley scramble</p>
                <button className="join-button">Join Now</button>
            </section>

            <section className='property-listing'>
                <Container fluid="md">
                    <h6 style={{ color: '#007bff', marginTop: '100px' }}> FEATURED LISTING</h6>
                    <h1 className="text-center my-4 app-title">We Bring Dream Homes To Reality</h1>
                    <Row>
                        {currentListings.map((listing, index) => (
                            <Col md={6} lg={4} className="mb-4" key={index} onClick={() => {
                                { localStorage.token ? navigate(`/properties/details/${listing._id}`) : navigate('login') }
                            }}>
                                <div className="listing-card-unique">
                                    <div className="listing-image-unique" style={{ backgroundImage: `url(${listing.photo[0]})` }}></div>
                                    <div className="listing-info-unique">
                                        <h6 style={{ backgroundColor: listing.saleOrRent === 'Rent' ? 'orange' : 'green', color: "white" }}>{listing.saleOrRent}</h6>
                                        <h2 className="listing-address-unique">City : {listing.city}</h2>
                                        <p className="listing-city-unique"> {listing.address}</p>
                                        <p className="listing-details-unique">{listing.description}</p>
                                        <div className="agent-info-unique">
                                            <span>Listed by:{listing.name}</span>
                                            <span>{listing.date}</span>
                                        </div>
                                        <h1>$ {listing ? `${listing.price} ${listing.saleOrRent === "Rent" ? "/ month" : ""}` : "Loading..."}
                                            <span style={{ backgroundColor: 'blue', color: 'white', fontSize: '16px' }}>
                                                {listing ? (listing.saleOrRent === "Rent" ? "For Rent" : "For Sale") : ""}
                                            </span>
                                        </h1>        </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                    {/* Pagination Controls */}
                    <div className="pagination">
                        {[...Array(Math.ceil(listings.length / itemsPerPage)).keys()].map(number => (
                            <button
                                key={number + 1}
                                onClick={() => paginate(number + 1)}
                                className={`pagination-button ${currentPage === number + 1 ? 'active' : ''}`}
                            >
                                {number + 1}
                            </button>
                        ))}
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default BodyPart3;
