import { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosWithJwtInstance } from "../helpers/axiosInstance";
// import { popularProducts } from "../helpers/dummyData";
import { mobileportrait } from "../helpers/responsive";
import Product from "./Product";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  ${mobileportrait({ padding: "0px" })};
`;

const Products = ({ cat, filters, sort }) => {
  // console.log(cat,"cat")
  // console.log(filters,"filters")
  // console.log(sort,"sort")  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axiosWithJwtInstance.get(
          cat ? `/products?category=${cat}` : "/products"
        );
        // console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  /* Object.entries pasa a Array un objeto y sus propiedades y valores,por ejemplo persona={nombre:'Paco',edad:15,peso:55} dará [['nombre','paco],['edad',15],['peso',55]]Puedo incluso imprimir una pareja property-value en concreto:
  console.log(Object.entries(persona)[1]) -> dará ['edad',15].A su vez recuerda que every devuelve el resultado booleano de una condicion,en este caso si la key o valor de un producto incluye el filtro da true y pasa el filter devolviendolo  */
  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [cat, filters, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else if (sort === "desc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
      { cat 
      ? filteredProducts.map((product) => (
        <Product item={product} key={product._id} />
      ))
      : products.slice(0,8).map((product) => (
        <Product item={product} key={product._id} />
      ))}
    </Container>
  );
};

export default Products;
