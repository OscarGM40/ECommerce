import { Send } from '@material-ui/icons';
import styled from "styled-components";
import { mobileportrait } from '../helpers/responsive';

const Container = styled.div`
  height: 60vh;
  background-color:#fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* ${ mobileportrait( {width: '100vw'} ) }; */
`;

const Title = styled.h1`
  font-size: 70px;
  margin-bottom: 20px;
`;
const Description = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${ mobileportrait( {textAlign: 'center'} ) };
  `;
const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color:white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${ mobileportrait( {width: '80%'} ) };

`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
  font-size: 16px;
`;
const Button = styled.button`
  flex:1;
  border: none;
  background-color: teal;
  color:white;
  cursor: pointer;
`;

const Newsletter = () => {
    return (
        <Container>
            <Title>Newsletter</Title>
            <Description>Get timely updates from your favorite products.</Description>
            <InputContainer>
                <Input placeholder="Your email" />
                <Button>
                <Send />

                </Button>
            </InputContainer>


        </Container>
    )
}

export default Newsletter
