import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';
import MessageContainer from './messages/MessageContainer';
import { useLocation } from 'react-router-dom';

import useConversation from '../zustand/useConversation'

const ProductDetailPage = () => {

    const location = useLocation();
    const { filteredConversations } = location.state || {};
    const { productId } = useParams();



    const [product, setProduct] = useState(null);
    const [loadingi, setLoadingi] = useState(true);
    const [error, setError] = useState(null);
    const [showMessageContainer, setShowMessageContainer] = useState(false);
    const [ownerData, setOwnerData] = useState(null);


    const { selectedConversation, setSelectedConversation, selectedProduct, setSelectedProduct } = useConversation();


    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const url = `http://localhost:8090/api/products/${productId}`;
                const response = await axios.get(url);
                setProduct(response.data.product);
            } catch (error) {
                setError('Failed to fetch product. Please try again later.');
            } finally {
                setLoadingi(false);
            }
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    useEffect(() => {
        const fetchOwner = async () => {
            if (product && product.userID) {
                try {
                    const url = `http://localhost:8090/api/products/owner/${product.userID}`;
                    const response = await axios.get(url);
                    if (response.data) {
                        const { fname, lname } = response.data;
                        setOwnerData({ fname, lname });
                    } else {
                        setError('Owner data not found');
                    }
                } catch (error) {
                    setError('Failed to fetch owner. Please try again later.');
                } finally {
                    setLoadingi(false);
                }
            }
        };

        fetchOwner();
    }, [product]);

    const toggleMessageContainer = () => {
        setSelectedConversation(filteredConversations);
        console.log(product.name);
        setSelectedProduct(product._id);
        setShowMessageContainer(!showMessageContainer);
    };

    if (loadingi) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const imageUrl = `http://localhost:8090/${product.image.replace(/\\/g, '/')}`;
    return (
        <div className='flex h-screen items-center'>
            <div className='p-6 h-20 flex items-center justify-center'>
                {product && (
                    <div className="product-detail-container">
                        <h1>{product.name}</h1>
                        <img src={imageUrl} alt={product.name} className="product-image" />
                        {ownerData && (
                            <div className='flex'>
                                <p className='m-2'>{ownerData.fname}</p>
                                <p className='m-2'>{ownerData.lname}</p>
                            </div>
                        )}

                        <p>{product.description}</p>
                        <p>Price: ₹{product.price}</p>
                        <div className="product-buttons">
                            {/* <button className="comment-button">Comments</button> */}
                            <button className="message-button" onClick={toggleMessageContainer}>
                                Message
                            </button>
                        </div>
                    </div>
                )}
            </div>


            {showMessageContainer && <MessageContainer />}
        </div>
    );
};

export default ProductDetailPage;
