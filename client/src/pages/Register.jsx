import styled from "styled-components";
import { mobileportrait } from "../helpers/responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #1682da44;
  border-radius: 10px;
  ${ mobileportrait( { width:"80%"} ) };
`;
const Title = styled.h1`
  font-size: 28px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Input = styled.input`
  flex:1;
  min-width: 40%;
  padding: 10px;
  margin: 20px 10px 0px 0px;
  border-radius: 10px;
  outline:none;
  font-size: 18px;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Button = styled.button`
  width:40%;
  border:none; 
  padding: 15px 20px;
  background-color: #307474;
  color: white;
  cursor: pointer;
  transition: all 0.5s linear;
  border-radius: 9px;
  font-size: 16px;

  &:hover {
     background-color: #1c4d4d;
     box-shadow: 
       1px 1px 5px #1d1a2ecc,
       2px 2px 10px #14103acc
  }
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
