import React, { Fragment, useState, useEffect } from "react";
import './AddProduct.css'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';
import { Link } from "react-router-dom";

const AddProduct = () => {



    const { authUser } = useAuthContext();
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        if (authUser && authUser._id) {
            setUserID(authUser._id);
        }
    }, [authUser]);



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
        formData.append('image', image);
        formData.append('description', description);
        // formData.append('userIdD', userID);

        // console.log(image, userID);
        const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        const token = chatUser.token;
        axios.post('http://localhost:8090/api/products/addProduct', formData, {
            headers: {
                'Authorization': `Bearer ${token}`, // Include JWT token in Authorization header
                'Content-Type': 'multipart/form-data', // Assuming JSON content type
            },
        })
            .then(response => {
                // Handle success
                // console.log(response.data);
                setLoading(false);
                setName("");
                setCategory("");
                setDescription("");
                setPrice("");
                setImage("");

                console.log(response);

            })
            .catch(error => {
                // Handle error
                console.error('There was an error!', error);
                setLoading(false);
            });


    };


    return (


        < div className='h-screen flex flex-col items-center justify-center w-96 mx-auto' >

            <div className='w-full  flex flex-col items-center p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

                <h1 className='text-3xl font-semibold text-ceter text-white'>Add Product</h1>

                <form>


                    <div>


                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Product Name"
                                onChange={(e) => {
                                    setName(e.target.value);
                                }}
                                value={name}
                                name='name'
                                required
                            />
                        </label>

                        <label>Category:</label>
                        <select
                            name="category"
                            onChange={(e) => {
                                setCategory(e.target.value);
                            }}
                            className="input"
                        > <option >Select Category</option>
                            <option value="Cars">Sports Equipments</option>
                            <option value="Cameras & Lenses">Stationary</option>
                            <option value="Computers & Laptops">Academic Books</option>
                            <option value="Mobile Phones">Electronic Devices</option>
                            <option value="Motorcycles">Lab Equipments</option>
                            <option value="Tablets">Cycles</option>
                            <option value="Tablets">Others</option>
                        </select>

                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="number"
                                className="grow"
                                placeholder="Price"
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                }}
                                value={price}
                                name='price'
                                required
                            />
                        </label>

                        <textarea
                            className="textarea textarea-success"
                            placeholder="Bio"
                            name="description"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        ></textarea>

                        <img
                            alt="Posts"
                            width="200px"
                            height="200px"
                            src={image ? URL.createObjectURL(image) : ""}
                        ></img>

                        <input
                            type="file"
                            accept="image" onChange={(e) => {
                                // console.log(e.target.files[0]);
                                setImage(e.target.files[0]);
                            }} className="file-input file-input-bordered w-full max-w-xs" />



                        <button type="button" class="btn btn-primary" onClick={handleSubmit}>ADD</button>
                    </div>
                </form>
            </div>

        </div >
    )
}

export default AddProduct





