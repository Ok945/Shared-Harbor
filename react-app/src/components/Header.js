import React, { useEffect, useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import OlxLogo from './icons/OlxLogo';
import SearchIcon from './icons/SearchIcon';
import SellButton from './icons/SellButton';
import SellButtonPlus from './icons/SellButtonPlus';
import { RiCloseLine } from 'react-icons/ri'; // Example: Importing a specific icon
import { useAuthContext } from '../context/AuthContext';
import axios from "axios";
import { IoLogoSkype } from "react-icons/io";


const Header = (props) => {

  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (authUser && authUser.fname) {
      setUser(authUser.fname);
    }
  }, [authUser]);


  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8090/api/auth/logout", {});
      const data = response.data;
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error) {
      // toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };








  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to="/">
          <div className="brandName">
            <IoLogoSkype size={65} />
          </div>
        </Link>

        <div className="placeSearch">
          <input
            type="text"
            placeholder="Search specific product..."
            value={props.search || ''}
            onChange={(e) => props.handleSearch && props.handleSearch(e.target.value)}
          />
          <div onClick={() => props.handleClick && props.handleClick()}>
            <SearchIcon />
          </div>
          {props.handleClearSearch && props.search && (
            <div id="clearBtn" onClick={props.handleClearSearch}>
              <RiCloseLine size={25} style={{ marginLeft: '5px' }} />
            </div>
          )}
        </div>

        <div className="loginPage">
          {user ? (
            <span>Welcome, {user}</span> // Display user's name if logged in
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>

        {user && (
          <span className="logout-span" onClick={logout} >
            Logout
          </span>
        )}
        {user && (
          <Link to="/admin">
            <span className="logout-span">Admin</span>
          </Link>
        )}


        {/* Conditional rendering based on user authentication */}
        {user ? (
          <Link to="/add-product">
            <div className="sellMenu">
              <SellButton />
              <div className="sellMenuContent">
                <SellButtonPlus />
                <span>SELL</span>
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="sellMenu">
              <SellButton />
              <div className="sellMenuContent">
                <SellButtonPlus />
                <span>SELL</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
