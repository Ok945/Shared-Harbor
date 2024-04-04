import React, { Fragment, useState, useEffect } from "react";
import Header from './Header'
import './AddProduct.css'
import axios from 'axios'
// import { useHistory } from "react-router";
import GoLoading from "./Loading/GoLoading";
import { jwtDecode } from 'jwt-decode';



const AddProduct = () => {

    // const { user } = useContext(AuthContext);
    // const history = useHistory();

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        // Retrieve token from localStorage
        const token = localStorage.getItem('token');

        if (token) {
            // Decode the token
            const decodedToken = jwtDecode(token);

            // Extract user data from decoded token
            const { data } = decodedToken;

            // Set user data state
            setUserData(data);
        }
    }, []);

    // console.log(userData._id)


    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('userId',userData._id);

        // console.log(formData);

        axios.post('http://localhost:8080/addProduct', formData)
            .then(response => {
                // Handle success
                // console.log(response.data);
                setLoading(false);
                setName("");
                setCategory("");
                setDescription("");
                setPrice("");
                setImage("");
                
            })
            .catch(error => {
                // Handle error
                console.error('There was an error!', error);
                setLoading(false);
            });


    };


    return (
        <Fragment>
            <Header />
            {loading && <GoLoading />}
            <div className="centerDiv">
                <label>Name</label>
                <br />
                <input
                    className="input"
                    type="text"
                    name="aame"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <br />
                <label>Category:</label>
                <select
                    name="category"
                    onChange={(e) => {
                        setCategory(e.target.value);
                    }}
                    className="input"
                > <option >Select Category</option>
                    <option value="Cars">Cars</option>
                    <option value="Cameras & Lenses">Cameras & Lenses</option>
                    <option value="Computers & Laptops">Computers & Laptops</option>
                    <option value="Mobile Phones">Mobile Phones</option>
                    <option value="Motorcycles">Motorcycles</option>
                    <option value="Tablets">Tablets</option>
                </select>
                <br />
                <label>Price</label>
                <br />
                <input
                    className="input"
                    type="number"
                    name="price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />
                <br />
                <label>Description</label>
                <br />
                <input
                    className="input"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                    }}
                />
                <br />

                <br />
                <img
                    alt="Posts"
                    width="200px"
                    height="200px"
                    src={image ? URL.createObjectURL(image) : ""}
                ></img>

                <br />
                <input
                    type="file"
                    onChange={(e) => {
                        // console.log(e.target.files[0]);
                        setImage(e.target.files[0]);
                    }}
                />
                <br />
                <button className="uploadBtn" onClick={handleSubmit}>
                    upload and Submit
                </button>
            </div>
        </Fragment>
    )
}

export default AddProduct
