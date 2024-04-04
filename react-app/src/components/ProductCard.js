import React from 'react'
import './ProductCard.css'
import { FaRegHeart } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {


    const { name, description, category, price, image, userID } = product;
    // console.log(product._id);





    return (
        <div className="container">
            <div className="head__section">
                <FaRegHeart />
            </div>

            <div className="display__product">
                <img src={'http://localhost:8080/' + image} alt={name} />
                <div className="slider">
                    <span></span>
                    <span></span>
                    <span className="active"></span>
                    <span></span>
                </div>
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
                    <span className="price">{price}</span>
                    <Link to={{
                        pathname: `/product/${product._id}`,
                        state: { product: product }
                    }}>
                        <button>See More</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard



