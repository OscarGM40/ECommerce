import styled from "styled-components";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

import { mobileportrait } from "../helpers/responsive";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  z-index: 3;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
  /* cursor: pointer; */
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 380px;
  height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  ${mobileportrait({ minWidth: 300 })};

  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(110%);
  }
`;

const Product = ({ item }) => {
  // console.log(item,'item')
  return (
    <Container>
      <Circle />
      <Image src={item?.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item?._id}`}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
