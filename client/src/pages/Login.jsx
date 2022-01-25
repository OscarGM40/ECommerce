import { useState } from "react";
import styled from "styled-components";
import { mobileportrait } from "../helpers/responsive";
import { Link as Enlace } from "react-router-dom";
import { loginCall } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 15px;
  ${mobileportrait({ width: "80%" })};
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
  font-size: 16px;
  border-radius: 10px;
  outline: none;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  font-size: 14px;
  border-radius: 5px;
  transition: all 0.4s linear;

  &:hover {
    background-color: #014747;
  }
  &:disabled{
   color:green; 
   cursor: not-allowed;
  }
`;

const Error = styled.span`
    color:red;

`;

const Link = styled.a`
  margin: 5px 0px;
  font-size: 13px;
  text-decoration: underline;
  color: black;
  cursor: pointer;
  `;

const Login = () => {

  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const {error} = useSelector( state => state.user)

    const handleInput = ({ target }) => {
    setUser({
      ...user,
      [target.name]: target.value,
    });
  };


  const handleLogin = (e) => {
    e.preventDefault();
    try {
      loginCall(user, dispatch)
      setTimeout(() => window.location.href = "/", 1000)
    } catch (e) {
      console.log(e)
    }
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleLogin} >
          <Input
            placeholder="email"
            name="email"
            onChange={handleInput}
            />

          <Input
            placeholder="password"
            name="password"
            type="password"
            onChange={handleInput}
            />
          <Button type="submit"
          // disabled={isFetching}
          >LOGIN</Button>
          {error && <Error>Something went wrong</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Enlace to="/register" style={{
            margin:"5px 0px",
            fontSize: "14px",
            textDecoration: "underline",
            color: "black",
            
          }}>
            CREATE A NEW ACCOUNT
          </Enlace>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
 