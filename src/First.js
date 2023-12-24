import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import HospitalList from './HospitalList';

const firstPageTheme = {
  textColor: '#001f3f',
  buttonColor: '#61dafb',
  buttonHoverColor: '#4fa3d1',
  headerBackground: '#001f3f',
  headerColor: '#fff',
  footerBackground: '#001f3f',
  footerColor: '#fff',
};

const HomePageContainer = styled.div`
  min-height: 100%;
  min-width: 1024px;
  width: 100%;
  height: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(${(props) => props.theme.background});
  background-size: cover;
  background-position: center;
  color: ${(props) => props.theme.textColor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 1024px) {
    left: 50%;
    margin-left: -512px;
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.headerBackground};
  color: ${(props) => props.theme.headerColor};
  font-size: 15px;
  padding: 2px;
  width: 100%;
  margin-top: -50px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
`;

const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 20px;
`;

const AbstractParagraph = styled.p`
  max-width: 1000px;
  text-align: center;
  margin: 20px auto;
  color: #00008B;
  font-weight: 400;
  font-size: 18px; /* Adjust the font size as needed */
`;

const SignInButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.buttonColor};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 1200px;
  margin-top: 50px;


  &:hover {
    background-color: ${(props) => props.theme.buttonHoverColor};
  }
`;

const Footer = styled.footer`
  background-color: ${(props) => props.theme.footerBackground};
  color: ${(props) => props.theme.footerColor};
  font-size: 14px;
  bottom: 0;
  position: fixed;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px;
`;

const First = () => {
  const navigate = useNavigate();  // Correct usage

  const handleLoginClick = () => {
    // Navigate to the SignInSignUp component when the login button is clicked
    navigate('/signin-signup');  // Correct usage
  };
  return (
    <ThemeProvider theme={firstPageTheme}>
      <HomePageContainer>
        <Header>
        <SignInButton onClick={handleLoginClick}>Login/Sign Up</SignInButton>
          <Title>Lung Cancer Detection and Staging</Title>
        </Header>
        <AbstractParagraph>
            Our focus is singular: revolutionizing lung cancer detection.Through artificial intelligence and machine learning, we are dedicated
            to providing swift and precise diagnoses. Our aim is to ensure that individuals at risk of or
            affected by lung cancer have access to advanced, efficient, and accurate detection methods. Join us in the
            pursuit of a future where early diagnosis becomes a beacon of hope, shaping improved outcomes and fostering
            a healthier world.
            <br></br>
            <br></br>
            Lung cancer, marked by uncontrolled cell growth in the lungs, poses a significant health challenge, with smoking, environmental factors, and genetic predisposition as common contributors.
             Tumors in the lungs are categorized as benign or malignant, the latter having the potential to spread. Staging plays a crucial role in assessing the disease's severity, with Stage I denoting localized tumors, Stage II indicating local advancement, and Stage III representing distant metastasis. Early detection and precise staging are paramount for tailoring effective treatment plans. The journey from Stage I to Stage III underscores the urgency of proactive measures, emphasizing the significance of awareness and regular screenings in combating lung cancer and improving patient outcomes.
          </AbstractParagraph>
          <HospitalList />
        
        <Footer>
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};


export default First;
