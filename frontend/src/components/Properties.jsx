import React, { useEffect, useState } from 'react';
import '../styles/Properties.css';
import { useNavigate } from 'react-router-dom';
import ApiRequest from '../lib/ApiRequest';
import pic from '../Assets/Download Blank Default Pfp Wallpaper _ Wallpapers_com.jpeg';
import ReactPaginate from 'react-paginate';
import { FaStar } from 'react-icons/fa'; // Import star icon for ratings
import { toast } from 'react-toastify'


function Properties() {
    const navigate = useNavigate();
    const [property, setProperty] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [priceRange, setPriceRange] = useState('Price');
    const [beds, setBeds] = useState('Select no of beds');
    const [propertyType, setPropertyType] = useState('Property Type');
    const [rentOrSale, setRentOrSale] = useState('Select Rent or Sale');
    const [currentPage, setCurrentPage] = useState(0);
    const propertiesPerPage = 8;

    const fetchData = async () => {
        try {
            const response = await ApiRequest.get('properties/viewAll');
            const propertiesWithRatings = response.data.map(property => {
                const totalRatings = property.ratings ? property.ratings.length : 0;
                const averageRating = totalRatings > 0
                    ? property.ratings.reduce((sum, rating) => sum + rating.star, 0) / totalRatings
                    : 0;
                return { ...property, averageRating, totalRatings };
            });
            setProperty(propertiesWithRatings);
            setFilteredProperties(propertiesWithRatings); // Initialize filtered properties
        } catch (error) {
            toast.error('Error');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [priceRange, beds, propertyType, rentOrSale]);

    const applyFilters = () => {
        let filtered = property;

        // Filter by price range
        if (priceRange !== 'Price') {
            const [min, max] = priceRange.split('-').map(Number);
            filtered = filtered.filter(item => item.price >= min && (!max || item.price <= max));
        }

        // Filter by number of beds
        if (beds !== 'Select no of beds') {
            const [minBeds, maxBeds] = beds.split('-').map(Number);
            filtered = filtered.filter(item => item.bedroom >= minBeds && item.bedroom <= (maxBeds || item.bedroom));
        }

        // Filter by property type
        if (propertyType !== 'Property Type') {
            filtered = filtered.filter(item => item.type === propertyType);
        }

        // Filter by rent or sale
        if (rentOrSale !== 'Select Rent or Sale') {
            filtered = filtered.filter(item => item.saleOrRent === rentOrSale);
        }

        setFilteredProperties(filtered);
    };

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const offset = currentPage * propertiesPerPage;
    const currentProperties = filteredProperties.slice(offset, offset + propertiesPerPage);

    const renderStars = (averageRating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <FaStar
                    key={i}
                    color={i <= averageRating ? '#ffc107' : '#e4e5e9'}
                />
            );
        }
        return stars;
    };

    return (
        <div className="new-container-fluid">
            <div className="new-header d-flex justify-content-center align-items-center">
                <h1>{filteredProperties.length} Results</h1>
            </div>
            <div className="new-filters d-flex justify-content-center align-items-center">
                <select className="form-control" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                    <option value="Price">Price</option>
                    <option value="0-100000">$0 - $100,000</option>
                    <option value="100001-200000">$100,001 - $200,000</option>
                    <option value="200001-300000">$200,001 - $300,000</option>
                    <option value="300001-400000">$300,001 - $400,000</option>
                    <option value="400001-500000">$400,001 - $500,000</option>
                    <option value="500001-plus">$500,001+</option>
                </select>
                <select className="form-control" value={beds} onChange={(e) => setBeds(e.target.value)}>
                    <option>Select no of beds</option>
                    <option value="1-2">1-2 Beds</option>
                    <option value="2-4">2-4 Beds</option>
                    <option value="4-6">4-6 Beds</option>
                    <option value="6-plus">6+ Beds</option>
                </select>
                <select className="form-control" value={propertyType} onChange={(e) => setPropertyType(e.target.value)}>
                    <option>Property Type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Office">Office</option>
                    <option value="Land">Land</option>
                    <option value="Shop">Shop</option>
                </select>
                <select className="form-control" value={rentOrSale} onChange={(e) => setRentOrSale(e.target.value)}>
                    <option value="Select Rent or Sale">Select Rent or Sale</option>
                    <option value="Sale">For Sale</option>
                    <option value="Rent">For Rent</option>
                </select>
            </div>
            <div className="new-property-list">
                {currentProperties.map((item) => (
                    <div className="new-property-item" key={item._id}>
                        <img src={item.photo ? item.photo[0] : pic} alt="Property" className="new-property-img" />
                        <div className="new-property-details">
                            <div>
                                <h3 style={{textWrap:"nowrap"}}>Listed by :{item.name}</h3>
                                <h1 style={{textWrap:"nowrap"}}>$ {item.price} {item.saleOrRent === "Rent" ? "/ month" : ""}
                                    <span style={{ backgroundColor: 'orange', color: 'white', fontSize: '16px' }}>
                                        {item.saleOrRent === "Rent" ? "For Rent" : "For Sale"}
                                    </span>
                                </h1>
                                <p>{item.address}</p>
                                <p>{item.measurements}ft² <span className="mx-2">{!item.bedroom ? '0' : item.bedroom}🛏️</span> <span>{!item.bathroom ? '0' : item.bathroom}🛁</span></p>
                                <div className="new-property-rating">
                                    {renderStars(item.averageRating)}
                                    <span> ({isNaN(item.averageRating) ? '0.0' : item.averageRating.toFixed(1)})</span>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-outline-primary" onClick={()=>{
                            {localStorage.token ? navigate(`/properties/details/${item._id}`) : navigate('/login')}
                        }}>View Details</button>
                    </div>
                ))}
            </div>
            <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.ceil(filteredProperties.length / propertiesPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Properties;
