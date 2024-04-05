import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, useNavigate } from 'react-router-dom'
import OlxLogo from "./icons/OlxLogo";
import SearchIcon from "./icons/SearchIcon";
import Arrow from "./icons/Arrow";
import SellButton from "./icons/SellButton";
import SellButtonPlus from "./icons/SellButtonPlus";
import { jwtDecode } from 'jwt-decode';
import { LuRefreshCcw } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";



const Header = (props) => {

  const navigate = useNavigate();

  const [user, setUser] = useState("");

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');

    if (token) {
      // Decode the token
      const decodedToken = jwtDecode(token);

      // Extract user data from decoded token
      const { data } = decodedToken;

      // Set user data state
      // console.log(data.email);
      // console.log(data.fname);
      setUser(data.fname);
    }
  }, []);


  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);


  // const handleEmptyClick = () => {
  //   alert("No items found.., please search by product name");
  // }





  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };






  const logoutHandler = () => {
    localStorage.removeItem('token');
    setUser("");
    navigate('/')
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to="/">
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
        </Link>


        <div className="placeSearch">

          <input type="text"
            placeholder="Search specific product..."
            value={props && props.search}
            onChange={(e) => props.handleSearch && props.handleSearch(e.target.value)}
          />

          <div onClick={() => props.handleClick && props.handleClick()}> <SearchIcon /> </div>
          {props.handleClearSearch && props.search && (
            <div id="clearBtn" onClick={props.handleClearSearch}>
              {/* <LuRefreshCcw size={25} style={{ marginLeft: '5px'}} /> */}
              <RxCross1 size={25} style={{ marginLeft: '5px'}}/>
            </div>
          )}


          {/* {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <div key={key} className="dataItem-header" onClick={() => handleSelectedSearch(value)}>
                    <p>{value.name} </p>
                  </div>
                );
              })}
            </div>
          )} */}

        </div>



        <div className="productSearch">
          {/* <Search /> */}
        </div>

        <div className="loginPage">
          {user ? (
            user
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>

        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}

        {localStorage.getItem('token') ? (
          <Link to="/add-product">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/login">
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <span>SELL</span>
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header
