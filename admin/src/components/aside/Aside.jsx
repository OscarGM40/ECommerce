import React, { useState } from 'react'
import {
   ExitToAppOutlined,
   GroupOutlined,
   HomeOutlined,
   LibraryAddOutlined,
   List,
   PersonAddOutlined,
   ShoppingCartOutlined,
} from "@material-ui/icons";
import SidebarItem from '../sidebarItem/SidebarItem';
import { Link } from 'react-router-dom';
import "./aside.css"
import SidebarItemLast from '../sidebarItem/SidebarItemLast';


const Aside = ({CSSclass,setCSSClass,handleAside}) => {
   const [theme, setTheme] = useState("")
// console.log(handleAside)

   return (
      // <div className={"sidebar " + theme}>
      <div className={handleAside ?"sidebar hidden "+theme :"sidebar "+theme}>
         <div className="sidebarWrapper">
            <div className="sidebarMenu">
               <h3 className={"sidebarTitle "+theme}>Home</h3>
               <Link to="/" className="sidebarlink">
                  <SidebarItem icon={<HomeOutlined />} text="Homepage" theme={theme} />
               </Link>
               <SidebarItem icon={<List />} text="Lists" theme={theme} />
            </div>

            <div className="sidebarMenu">
               <h3 className={"sidebarTitle "+theme}>User </h3>
               <Link to="/users" className="sidebarlink">
               <SidebarItem icon={<GroupOutlined />} text="Users" theme={theme} />
               </Link>
               <Link to="/newUser" className="sidebarlink">
               <SidebarItem icon={<PersonAddOutlined />} text="Create User" theme={theme} />
               </Link>
            </div>
            <div className="sidebarMenu">
               <h3 className={"sidebarTitle "+theme}>Product</h3>
               <Link to="/products" className="sidebarlink">
               <SidebarItem icon={<ShoppingCartOutlined />} text="Products" theme={theme} />
               </Link>
               <Link to="/newProduct" className="sidebarlink">
               <SidebarItem icon={<LibraryAddOutlined />} text="Create Product" theme={theme} />
               </Link>
            </div>
            <div className="sidebarMenu">
               <h3 className={"sidebarTitle "+theme}>LogOut</h3>
               <SidebarItemLast icon={<ExitToAppOutlined />} text="Logout" theme={theme} 
               CSSclass={CSSclass} setCSSClass={setCSSClass} />
            </div>
         </div>
         <div className="sidebar-bottom">
            <div className="color-box dark" onClick={() => setTheme("dark")}></div>
            <div className="color-box night" onClick={() => setTheme("night")}></div>
            <div className="color-box light" onClick={() => setTheme("light")}></div>
         </div>
      </div>
   )
}

export default Aside
