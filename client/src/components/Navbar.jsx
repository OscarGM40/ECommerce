import React from "react";
import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import styled from "styled-components";
import { mobileportrait } from "../helpers/responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutCall } from "../redux/apiCalls";

const Container = styled.div`
  height: 60px;
  ${mobileportrait({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobileportrait({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobileportrait({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobileportrait({ width: "50px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobileportrait({ fontSize: "24px" })};
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobileportrait({ justifyContent: "flex-start", flex: 2 })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobileportrait({ fontSize: "12px", marginLeft: "10px" })};
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  console.log(user.currentUser, "user");
  
  const dispatch = useDispatch()

  const handleLogout = () => {
      logoutCall(dispatch);
      setTimeout(() => window.location.href = '/login', 200);
    }
    
    const handleRegister = () => {
      logoutCall(dispatch);
      setTimeout(() => window.location.href = '/register', 200);
   }

  
  
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>LAMA.</Logo>
        </Center>
        <Right>
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "black" }}
            onClick={handleRegister}
          >
            <MenuItem>REGISTER</MenuItem>
          </Link>
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}
          onClick={handleLogout} > 
            <MenuItem>{user.currentUser ? "LOGOUT" : "LOGIN" }</MenuItem>
          </Link>
          <Link
            to="/cart"
            style={{ textDecoration: "none", color: "black" }}
            >
          <MenuItem>
            <Badge badgeContent={cart.quantity || 0} color="primary">
              <ShoppingCartOutlined />
            </Badge>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
