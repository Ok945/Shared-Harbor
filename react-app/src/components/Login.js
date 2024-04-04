import React from 'react'
import './Login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    const [passShow, setPassShow] = useState(false);

    const [inputVal, setInputVal] = useState({
        email: "",
        password: "",
    })



    const setVal = (e) => {
        const { name, value } = e.target;
        setInputVal(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const url = 'http://localhost:8080/login'


    const addUserData = async (e) => {
        e.preventDefault();
        const { email, password } = inputVal;

        if (email === "") {
            alert("Please enter Your Email");
        } else if (!email.includes("@")) {
            alert("Enter Valid Email")
        } else if (password.length < 6) {
            alert("Password must be of min 6 char")
        } else {
            const userData = {
                email,
                password
            };


            axios.post(url, userData)
                .then((res) => {
                    if (res.status === 201) {
                        localStorage.setItem('token', res.data.token);
                        alert("Login Successfull");
                        setInputVal({ email: "", password: "", });
                        navigate('/');
                    }
                })
                .catch((error) => {

                    if (error.response.status === 409) {
                        alert("Wrong Passwork");
                    } else if (error.response.status === 422) {
                        alert("User not exits");
                    } else {
                        alert("An error occurred while sending the request.");
                        console.log(error);
                    }


                });
        }


    }



    return (
        <div>

            <div className='formbox'>

                <form className="wrapper">
                    <h2>LOGIN</h2>
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
                    <button type="button" className="btn" onClick={addUserData}>
                        LOGIN
                    </button>
                    <section className="group">
                        <p>Don't have an account? <Link to="/signup">Sign up</Link>.</p>
                    </section>
                    <span className="footer"></span>
                </form>
            </div>

        </div>
    )
}

export default Login




