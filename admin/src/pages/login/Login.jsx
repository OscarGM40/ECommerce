import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { mediumScreens, mobilelandscape, mobileportrait, tablet } from "../../helpers/mediaQueries";
import { loginCall } from "../../redux/apiCalls";


const Container = styled.div`
  width:100vw;
  height: 100vh;
  background: linear-gradient(
    rgba(255, 255, 255,0.5),
    rgba(255, 255, 255,0.3)
  ),url("images/bed01.jpeg") center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width:40%;
  padding: 20px;
  background-color:  #ffffff22;
  border-radius: 15px;
  ${ mediumScreens( { width:"50%"} ) };
  ${ tablet( { width:"65%"} ) };
  ${ mobilelandscape( { width:"75%"} ) };
  ${ mobileportrait( { width:"80%"} ) };
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 300;
  margin-bottom: 10px;
`;

const Form = styled.form`
  display: flex;
  /* flex-wrap: wrap; */
  flex-direction: column;
`;

const Input = styled.input`
  flex:1;
  min-width:40%;
  margin: 20px 0px;
  padding:15px;
  font-size: 16px;
  border-radius: 15px;
  outline:none;
`

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 10px 0px;
  font-size: 14px;
  font-weight: 300;
  border-radius: 5px;
  transition: all 0.4s linear;

  &:hover {
    background-color: #014747;
  }
`;

const Link = styled.a`
  margin: 5px 0px;  
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

/* Begin of the component */
const Login = () => {

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, password }

    // diria que en cuanto use apiCalls y dispatchs en su interior como es este caso tengo que usar esta sintaxis method(data,dispatch)
    try{
      loginCall(user,dispatch)  
      setTimeout( () => window.location.href = "/",500) 
    }catch(e){
      console.log(e)
    }

    
  };


  return (
    <>
      <Container>
        <Wrapper>
            <Form onSubmit={handleLogin}>
              <Title>LOGIN AS ADMIN</Title>
                <Input
                  placeholder="enter email"
                  type="email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  />
                <Input
                  type="password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                />
              <Button  
                // onClick={handleLogin}
                // disabled={isFetching}
                >
              ACCESS (Only Admins)
              </Button>
              <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
              <Link target="_blank" href={`${process.env.REACT_APP_CLIENT_URL}/register`}>CREATE A NEW ACCOUNT</Link>
            </Form>
        </Wrapper>
      </Container>
    </>
  );
};

export default Login;
