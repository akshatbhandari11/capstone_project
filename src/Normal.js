import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 

const homePageTheme = {
  background: '/images/background2.jpg',
  textColor: '#001f3f',
  buttonColor: '#001f3f',
  buttonHoverColor: '#003366',
  headerBackground: '#001f3f',
  headerColor: '#fff',
  footerBackground: '#001f3f',
  footerColor: '#fff',
};
const ContentContainer = styled.div`
  /* Add any specific styling for the content container */
  max-width: 600px;
  width: 100%;
  margin-left: 375px;
  margin-right: auto;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  text-align: left; /* Align text to the left */
  margin-top: 10px;
  margin-bottom: 400px;
`;



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
  padding: 0px 0; /* Adjusted padding to create space above and below the header */
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: -1;
  margin-top : -40px;
`;


const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom: 20px;
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
  padding: 6px;
  margin-bottom: 0px;
`;

const Normal = () => {
  const navigate = useNavigate();  // Correct usage

  const handleLogoutClick = () => {
    // Implement the logout logic here, e.g., clear user data, navigate to login page
    navigate('/'); // Navigate to the login page after logout
  };
  return (
    <ThemeProvider theme={homePageTheme}>
      <HomePageContainer>
        <Header>
          <LogoutButton onClick={handleLogoutClick}>Logout</LogoutButton>
          <Title>Lung Cancer Detection and Staging</Title>
        </Header>
        
        <ContentContainer>
          <h2>Your lungs look healthy! No signs of cancer</h2>
          <p>Congratulations on having a normal lung scan! To maintain healthy lungs and reduce the risk of lung cancer, consider the following tips:</p>

          <ul>
            <li><strong>Avoid Tobacco:</strong> If you smoke, quitting is the best decision for your lung health.</li>
            <li><strong>Stay Active:</strong> Engage in regular physical activity to support your overall health, including lung function.</li>
            <li><strong>Maintain a Balanced Diet:</strong> Consume a diet rich in fruits, vegetables, and omega-3 fatty acids to promote lung health.</li>
            <li><strong>Protect Against Occupational Hazards:</strong> If your work involves exposure to harmful substances, use proper protective gear.</li>
            <li><strong>Ensure Indoor Air Quality:</strong> Minimize exposure to pollutants and use air purifiers for clean indoor air.</li>
            <li><strong>Stay Hydrated:</strong> Drink plenty of water to keep your respiratory system well-hydrated.</li>
          </ul>

          <p>Remember, these practices contribute to overall well-being and reduce the risk of various health issues, including lung cancer.</p>
        </ContentContainer>
      
        <Footer>
          {/* Add your footer content here */}
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};


export default Normal;
