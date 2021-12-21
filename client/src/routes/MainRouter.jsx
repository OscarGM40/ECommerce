import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import Cart from "../pages/Cart";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Product from "../pages/Product";
import ProductList from "../pages/ProductList";
import Register from "../pages/Register";
import Success from "../pages/Success";

const MainRouter = () => {
 
  const user = useSelector( (state) => state.user.currentUser) || false;
  // const user = false;
  
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          { user ? <Home /> : <Redirect to="/login" />}
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        
        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login />}
          {/* <Login /> */}
        </Route>
        <Route path="/register">
         {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default MainRouter;
