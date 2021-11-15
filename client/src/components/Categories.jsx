import styled from "styled-components";
import { categories } from "../helpers/dummyData";
import { mobileportrait } from "../helpers/responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${ mobileportrait( { padding:0,flexDirection: "column"} ) };
`;

const Categories = () => {
  return (
    <Container>
      {categories.map((item) => (
        < CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
