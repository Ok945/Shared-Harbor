import React from 'react'
import './ProductCard.css'
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


import useGetConversations from "../hooks/useGetConversations";

const ProductCard = ({ product }) => {


    const { _id, name, description, price, image, userID } = product;
    const { loading, conversations } = useGetConversations();

    console.log(conversations);


    const filterConversation = () => {
        if (!userID || !conversations || conversations.length === 0) {
            return [];
        }

        const filteredConversations = conversations.filter(conversation => {
            return conversation._id === userID;
        });

        return filteredConversations;
    };
    const filteredConversations = filterConversation();



    const navigate = useNavigate();

    const handleClick = () => {
        if (filteredConversations && filteredConversations.length > 0) {
            navigate(`/product/${_id}`, {
                state: {
                    productID: _id,
                    filteredConversations: filteredConversations
                }
            });
        } else {
            // Handle case where filteredConversations is empty or undefined
            console.log('');
            // Optionally show a message or perform another action
        }
    };

    const imageUrl = `http://localhost:8090/${image.replace(/\\/g, '/')}`;


    return (





        <div className="card card-compact w-96 bg-base-100 shadow-xl m-6">
            <div className="h-10 w-10 bg-red-500 text-white rounded-full shadow-lg absolute top-0 left-0 m-2 flex justify-center items-center text-xl">
                <FaRegHeart />
            </div>
            <figure>
                <img src={imageUrl} alt={name} />

            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>{description}</p>
                <div className="card-actions justify-between ">
                    <span className="price text-l">₹{price}</span>
                    <button className="btn btn-primary" onClick={handleClick}>See More</button>
                </div>
            </div>
        </div>






    );
};

export default ProductCard



{/* <div className="container">
          

            <div className="display__product">
               
            </div>
            <div className="product__details">
                <div className="title">
                    <h2>{name}</h2>
                    <p>{description}</p>
                </div>
                <div className="product_owner">
                    <p>Owner Name</p>
                </div>
                <div className="product__add">
                   
                   
                </div>
            </div>
        </div> */}