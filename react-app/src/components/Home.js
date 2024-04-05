import React, { useEffect, useState } from 'react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const [originalProducts, setOriginalProducts] = useState([]); // State to hold original products list
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const url = 'http://localhost:8080/getProduct';
                const response = await axios.get(url);
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
        axios.get('http://localhost:8080/getProduct')
            .then(response => {
                setProducts(response.data.products);
            })
            .catch(error => {
                setError('Failed to fetch products. Please try again later.');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className='mainContainer'>
            <Header search={search} handleSearch={handleSearch} handleClick={handleSearchClick} handleClearSearch={handleClearSearch} />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : products.length > 0 ? (
                <div className='productsContainer'>
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div>No products found.</div>
            )}
        </div>
    );
};

export default Home;
