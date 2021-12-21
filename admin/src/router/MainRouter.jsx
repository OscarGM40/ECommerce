import React, { useState } from 'react'
import "./MainRouter.css";
import {
   BrowserRouter as Router,
   Switch,
   Route,
   Redirect,
} from "react-router-dom";
import Login from '../pages/login/Login';
import Home from '../pages/home/Home';
import NewUser from '../pages/userZone/newUser/NewUser';
import Navbar from '../components/navbar/Navbar';
import Aside from '../components/aside/Aside';
import UserList from '../pages/userZone/userList/UserList';
import ProductList from '../pages/productZone/productList/ProductList';
import Product from '../pages/productZone/product/Product';
import NewProduct from '../pages/productZone/newProduct/NewProduct';
import User from '../pages/userZone/user/User';
import MyModal from '../components/modal/MyModal';


const MainRouter = () => {

   const [CSSclass, setCSSClass] = useState("")
   const [handleAside, setHandleAside] = useState(false);

   let admin = false;

   try {
      admin = JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user).currentUser?.isAdmin;

   }catch(err){
      console.log(err)
   }


   return (
      <Router>
         <Switch>
            <Route path="/login">
               {admin ? <Redirect to="/" /> : <Login />}
            </Route>
            {/* <Route exact path="/"> */}
            {admin ? (
               <>
                  <section className="header">
                     <div className="header__navbar">
                        <Navbar setHandleAside={setHandleAside} handleAside={handleAside} />
                     </div>
                     <div className="header__content">
                        <div className="header__aside">
                           <Aside CSSclass={CSSclass} setCSSClass={setCSSClass} handleAside={handleAside} />
                        </div>
                        <div className="header__main">
                           <Route exact path="/">
                              <Home />
                           </Route>
                           {/* UserZone  */}
                           <Route exact path="/users">
                              <UserList />
                           </Route>
                           <Route path="/user/:userId">
                              <User />
                           </Route>
                           <Route path="/newUser">
                              <NewUser />
                           </Route>

                           {/* Product Zone */}
                           <Route path="/products">
                              <ProductList />
                           </Route>
                           <Route path="/product/:productId">
                              <Product />
                           </Route>
                           <Route path="/newProduct">
                              <NewProduct />
                           </Route>
                           {/* Another Zone */}

                        </div>
                     </div>
                  </section>
                  {/* TODO terminar modal para el logout cuando sepa hacerlo en redux*/}
                  <MyModal CSSclass={CSSclass} setCSSClass={setCSSClass} />
               </>
            ) : <Login />}
            {/* </Route> */}
         </Switch>
      </Router>
   )
}

export default MainRouter
