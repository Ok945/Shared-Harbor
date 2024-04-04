import React from 'react'
import Header from './Header'
import './Login.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

const Signup = () => {



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

    const url = 'http://localhost:8080/signup'


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
                        alert("User registration done!");
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
        <div>
            <div>
                {/* <Header /> */}

                <div className='formbox'>
                    <form className="wrapper">
                        <h2>Sign Up</h2>

                        <section className="group">
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputVal.fname}
                                size="30"
                                className="input"
                                name="fname"
                                required
                            />
                            <label htmlFor="fname" className="label">
                                First Name
                            </label>
                        </section>

                        <section className="group">
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputVal.lname}
                                size="30"
                                className="input"
                                name="lname"
                                required
                            />
                            <label htmlFor="lname" className="label">
                                Last Name
                            </label>
                        </section>

                        <section className="group">
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputVal.email}
                                size="30"
                                className="input"
                                name="email"
                                required
                            />
                            <label htmlFor="email" className="label">
                                Email
                            </label>
                        </section>

                        <section className="group">
                            <input
                                type="text"
                                onChange={setVal}
                                value={inputVal.mis}
                                size="30"
                                className="input"
                                name="mis"
                                required
                            />
                            <label htmlFor="mis" className="label">
                                MIS
                            </label>
                        </section>


                        <section className='group' style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                type={!passShow ? "password" : "text"}
                                onChange={setVal}
                                value={inputVal.password}
                                minLength="8"
                                className="input"
                                name="password"
                                required
                                style={{ flex: 1 }}

                            />
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <div
                                className="showpass"
                                onClick={() => setPassShow(!passShow)}
                                style={{ cursor: 'pointer' }}                             >
                                {!passShow ? "Show" : "Hide"}
                            </div>
                        </section>


                        <section className='group' style={{ display: 'flex', flexDirection: 'row' }}>
                            <input
                                type={!cpassShow ? "password" : "text"}
                                onChange={setVal}
                                value={inputVal.cpassword}
                                minLength="8"
                                className="input"
                                name="cpassword"
                                required
                                style={{ flex: 1, }}
                            />
                            <label htmlFor="cpassword" className="label">
                                Confirm Password
                            </label>
                            <div
                                className="showpass"
                                onClick={() => setCpassShow(!cpassShow)}
                                style={{ cursor: 'pointer' }}
                            >
                                {!cpassShow ? "Show" : "Hide"}
                            </div>
                        </section>



                        <button type="button" className="btn" onClick={addUserData}>
                            Register
                        </button>

                        <span className="footer"></span>
                    </form>
                </div>


            </div>
        </div>
    )
}

export default Signup
