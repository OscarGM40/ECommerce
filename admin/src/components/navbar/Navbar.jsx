import { ArrowDropDown, SwapHorizontalCircleSharp } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import "./navbar.css";

const Navbar = ({setHandleAside,handleAside}) => {

  const changeAside = () => {
    setHandleAside( (prev) => (!prev))
  }
  
 const {username} = useSelector((state) => state.user.currentUser);

  return (
    <div className="navbarWrapper">
      <div className="navbarLeft">
        <div className="logo">
          <img src="images/LogoMakr01.png" alt="" />
        </div>
        <div className="navbarLinks">
          <span className="navbarLink">Home</span>
          <span className="navbarLink">{handleAside ? "Show": `Hide`}</span>
            <span >
              <SwapHorizontalCircleSharp fontSize="large" className="icono" 
              onClick={changeAside} style={{cursor: "pointer"}}/>
            </span>
        </div>
      </div>
      <div className="navbarCenter">
        <div className="search">
          <input
            type="text"
            placeholder="search for something..."
            className="searchInput"
          />
        </div>
      </div>
      <div className="navbarRight">
        <img
          className="avatar"
          src="https://images.pexels.com/photos/3024627/pexels-photo-3024627.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          alt=""
        />
        {/* <span className="navbarName">{name}</span> */}
        <span className="navbarName">{username}</span>
        <ArrowDropDown style={{cursor: "pointer"}}/>
      </div>
    </div>
  );
};

export default Navbar;
