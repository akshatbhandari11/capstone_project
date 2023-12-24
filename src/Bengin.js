import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

import { Link } from 'react-router-dom';


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
  margin-top: -420px;
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
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  border-radius: 10px;
  color: #00008B;
  font-weight: 400;
  font-size: 18px; /* Adjust the font size as needed */
`;

const LogoutButton = styled.button`
  padding: 10px 10px;
  font-size: 1rem;
  background-color: #008B8B;
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

const Benign = () => {
  const navigate = useNavigate();  // Correct usage

  const handleLogoutClick = () => {
    // Implement the logout logic here, e.g., clear user data, navigate to login page
    navigate('/'); // Navigate to the login page after logout
  };
  return (
    <ThemeProvider theme={firstPageTheme}>
      <HomePageContainer>
        <Header>
        <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
          <Title>Lung Cancer Detection and Staging</Title>
        </Header>
       
<AbstractParagraph>
  <h2 style={{ fontSize: '28px', color: '#1a1a1a' }}>Report</h2>
  <p style={{ fontSize: '20px', color: '#333' }}>
    Cancer Type: Benign
  </p>
  <Link to="/Infobengin">
    <button style={{ fontSize: '16px', padding: '10px 20px', background: '#61dafb', color: '#fff', border: 'none', cursor: 'pointer', marginTop: '15px' }}>
      More Information
    </button>
  </Link>
</AbstractParagraph>
        <Footer>
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};


export default Benign;
