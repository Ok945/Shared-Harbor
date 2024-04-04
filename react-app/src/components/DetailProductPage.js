// ProductDetailPage.js
import React from 'react';
import Header from './Header';

const ProductDetailPage = ({ location }) => {
    // const { name, description, category, price, image, userID } = product;

    const { product } = location.state;
    console.log(product);

    
    return (
        <div>
            <Header />
            {/* <div className="product-detail-container">
                <img src={'http://localhost:8080/' + image} alt={name} />
                <div>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Category: {category}</p>
                    <p>Price: {price}</p>
                  
                </div>
            </div>
            <div className="buttons-container">
                <button>Comments</button>
                <button>Message</button>
            </div> */}
        </div>
    );
};

export default ProductDetailPage;
