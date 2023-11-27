import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

// Define a separate theme for the First page
const firstPageTheme = {
  background: '/images/background2.jpg',
  textColor: '#001f3f',
  buttonColor: '#61dafb',
  buttonHoverColor: '#4fa3d1',
  headerBackground: '#001f3f',  // Update this to navy blue color
  headerColor: '#fff',
  footerBackground: '#001f3f',  // Update this to navy blue color
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
    /* Specific to this particular image */
    left: 50%;
    margin-left: -512px; /* 50% */
  }
`;

const Header = styled.header`
  background-color: ${(props) => props.theme.headerBackground};
  color: ${(props) => props.theme.headerColor};
  font-size: 15px;
  padding: 2px;
  width: 100%;
  margin-top: -690px;
  text-align: center;
`;



const Title = styled.h1`
  font-size: 3.7rem;
  margin-bottom: 20px; /* Adjust the margin as needed */
  text-color: '#001f3f';
`;

const SignInButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  background-color: ${(props) => props.theme.buttonColor};
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

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
  return (
    <ThemeProvider theme={firstPageTheme}>
      <HomePageContainer>
        <Header>
          
          <h2>Lung Cancer Detection and Staging</h2>
        </Header>
        
        
        <Footer>
          {/* Add your footer content here */}
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};

export default First;
