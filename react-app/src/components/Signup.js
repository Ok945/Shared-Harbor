import React from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext'

import { Link } from 'react-router-dom'
const Signup = () => {

    const { setAuthUser } = useAuthContext();

    const navigate = useNavigate();


    const [cpassShow, setCpassShow] = useState(false);
    const [passShow, setPassShow] = useState(false);

    const [inputVal, setInputVal] = useState({
        fname: "",
        lname: "",
        email: "",
        mis: "",
        password: "",
        cpassword: ""


    })




    const setVal = (e) => {
        const { name, value } = e.target;
        setInputVal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const url = 'http://localhost:8090/api/auth/signup'


    const addUserData = async (e) => {
        e.preventDefault();
        const { fname, lname, email, mis, password, cpassword } = inputVal;

        if (fname === "") {
            alert("Please enter Your Name")
        } else if (lname === "") {
            alert("Please enter Your Email");
        } else if (email === "") {
            alert("Please enter Your Email");
        } else if (!email.includes("@")) {
            alert("Enter Valid Email")
        } else if (mis.length !== 9) {
            alert("Please Enter Valid MIS")
        } else if (password.length < 6) {
            alert("Password must be of min 6 char")
        } else if (password !== cpassword) {
            alert("Passwoed and Confirm Password Should be same ")
        } else {
            const userData = {
                fname,
                lname,
                email,
                mis,
                password,
                cpassword
            };


            axios.post(url, userData)
                .then((res) => {
                    if (res.status === 201) {

                        const userData = res.data;
                        localStorage.setItem("chat-user", JSON.stringify(userData));
                        setAuthUser(userData);

                        // alert("User registration done!");
                        setInputVal({ fname: "", lname: "", email: "", mis: "", password: "", cpassword: "" });
                        navigate('/login');
                    }
                })
                .catch((error) => {
                    if (error.response.status === 409) {
                        alert("The user already exists.");
                        setInputVal({ fname: "", lname: "", email: "", mis: "", password: "", cpassword: "" });
                        navigate('/login');
                    } else {
                        alert("An error occurred while sending the request.");
                        console.log(error);
                    }

                });
        }


    }




    return (
        <div className='h-screen flex flex-col items-center justify-center w-96 mx-auto'>

            <div className='w-full  flex flex-col items-center p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>

                <h1 className='text-3xl font-semibold text-ceter text-gray-800'>Sign In</h1>

                <form>


                    <div>


                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="First Name"
                                onChange={setVal}
                                value={inputVal.fname}
                                name='fname'
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Last Name"
                                onChange={setVal}
                                value={inputVal.lname}
                                name='lname'
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Enter MIS"
                                onChange={setVal}
                                value={inputVal.mis}
                                name='mis'
                                required
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input
                                type="text"
                                className="grow"
                                placeholder="Email"
                                onChange={setVal}
                                value={inputVal.email}
                                name='email'
                                required
                            />
                        </label>



                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input
                                type="password"
                                className="grow"
                                onChange={setVal}
                                value={inputVal.password}
                                minLength="8"
                                name="password"
                                required

                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                            <input
                                type="password"
                                className="grow"
                                onChange={setVal}
                                value={inputVal.cpassword}
                                minLength="8"
                                name="cpassword"
                                required

                            />
                        </label>
                        <button type="button" class="btn btn-primary" onClick={addUserData}>LOGIN</button>
                    </div>
                    <section className="group">
                        <p>Don't have an account?  <Link to="/signup" className="link link-primary">Sign up</Link></p>
                    </section>
                    <span className="footer"></span>
                </form>
            </div>

        </div>
    )
}

export default Signup
