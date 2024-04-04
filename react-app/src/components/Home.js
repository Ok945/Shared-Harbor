import React, { useEffect, useState } from 'react'
import Header from './Header'
import { Link, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import axios from 'axios';
import './Home.css';

const Home = () => {

    const navigate = useNavigate();


    const [products, setProducts] = useState([]);


    // Function to check if user is logged in
    const checkLoggedIn = () => {
        if (!localStorage.getItem('token')) {

            navigate('/login');
        } else {

            navigate('/add-product');
        }
    };


    useEffect(() => {

        const url = 'http://localhost:8080/getProduct'

        axios.get(url)
            .then((res) => {
                // console.log(res);
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch((err) => {
                console.log(err);
                alert("server err!!")
            })

    })

    return (
        <div className='mainContainer'>
            <Header />
            {products && products.length > 0 &&
                <div className='productsContainer'>
                    {products.map((product) => ( // Iterate over products array and pass each product to ProductCard
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            }
        </div>
    )
}

export default Home
