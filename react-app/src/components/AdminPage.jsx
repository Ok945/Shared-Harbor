import React, { useEffect, useState } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../context/AuthContext';

const AdminPage = () => {

    const [originalProducts, setOriginalProducts] = useState([]); // State to hold original products list
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { authUser } = useAuthContext();



    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // console.log(authUser._id)
                const chatUser = JSON.parse(localStorage.getItem('chat-user'));
                const token = chatUser.token;
                const url = `http://localhost:8090/api/products/admin/${authUser._id}`;
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include JWT token in Authorization header
                        'Content-Type': 'multipart/form-data', // Assuming JSON content type
                    },
                });
                setOriginalProducts(response.data.products); // Store original products
                setProducts(response.data.products); // Set products
            } catch (error) {
                setError('Failed to fetch products. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleSearchClick = () => {
        // Filter products based on search query
        if (search !== '') {
            const filteredProducts = originalProducts.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())
            );
            setProducts(filteredProducts);
        } else {
            setProducts(originalProducts); // Revert back to original products when search is cleared
        }
    };



    const handleClearSearch = () => {
        // Clear search and reset products list
        setSearch('');
        // Refetch products from the server to reset the list
        setLoading(true);
        axios.get('http://localhost:8090/api/products')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                setError('Failed to fetch products. Please try again later.');
            })
            .finally(() => setLoading(false));
    };



    const navigate = useNavigate();



    const handleClick = (id) => {
        navigate(`/admin/product/${id}`, {
            state: {
                productID: id
            }
        });

    };

    return (
        <div className='h-screen flex justify-center'>
            <Header search={search} handleSearch={handleSearch} handleClick={handleSearchClick} handleClearSearch={handleClearSearch} />


            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : products.length > 0 ? (
                <div className='m-40 flex flex-wrap justify-around'>
                    {products.map((product) => (
                        <div className="card card-compact w-96 bg-base-100 shadow-xl">

                            <figure>
                                <img src={'http://localhost:8090/' + product.image} alt={product.name} />

                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{product.name}</h2>
                                <p>{product.description}</p>
                                <div className="card-actions justify-between ">
                                    <span className="price text-l">₹{product.price}</span>
                                    <button className="btn btn-primary" onClick={() => handleClick(product._id)}>See More</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No products found.</div>
            )}

        </div>
    );
};

export default AdminPage;
