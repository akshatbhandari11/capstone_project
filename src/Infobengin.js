import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useNavigate } from 'react-router-dom'; 



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

const AbstractParagraph = styled.div`
  max-width: 1000px;
  text-align: center;
  margin: 20px auto;
  padding: 10px; /* Add padding for better visual appearance */
  background-color: rgba(255, 255, 255, 0.8); /* Transparent white background */
  border-radius: 10px; /* Add border-radius for rounded corners */
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
  padding: 0px;
  margin-bottom:-55px;
`;

const Infobengin = () => {
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
        <h2 style={{ fontSize: '28px', color: '#1a1a1a' }}>What’s a Benign Tumor?</h2>
        <p style={{ fontSize: '20px', color: '#333' }}>
          Benign tumors aren’t cancerous and are usually not life-threatening. But like their malignant cousins, they develop when cells grow abnormally,
          and they may form anywhere in the body, though benign cells don’t typically invade nearby tissue or spread—they’re contained to the tumor.
        </p>

        <h3 style={{ fontSize: '24px', color: '#1a1a1a' }}>Do Benign Tumors Require Treatment?</h3>
        <p style={{ fontSize: '18px', color: '#444' }}>
          In general, benign tumors grow slowly, and some never need treatment. Others may cause serious health risks when they press on nearby organs,
          nerves or blood vessels, or grow in the brain or on the spinal cord. These kinds of tumors typically require surgery to remove.
          Once they are removed, most benign tumors don’t grow back.
        </p>

        <h3 style={{ fontSize: '24px', color: '#1a1a1a' }}>Active Surveillance for Benign Tumors</h3>
        <p style={{ fontSize: '18px', color: '#555' }}>
          The doctor may decide to closely watch a benign tumor to see whether it grows to the point that it causes problems before it’s surgically removed.
          This approach, called active surveillance, helps delay or even avoid surgery completely.
        </p>

        <h3 style={{ fontSize: '24px', color: '#1a1a1a' }}>Can Benign Tumors Become Cancers?</h3>
        <p style={{ fontSize: '18px', color: '#666' }}>
          Some benign tumors also have the potential to become cancerous when abnormal cells continue to divide out of control.
          These kinds of tumors are also carefully watched. If normal-looking cells are reproducing faster than normal—a process called hyperplasia—for example,
          the tumor will be closely monitored. If abnormal-looking cells reproduce faster than normal and but may appear abnormal—called dysplasia—the tumor will be watched even more carefully.
        </p>
      </AbstractParagraph>
        <Footer>
          <p>&copy; Team 103</p>
        </Footer>
      </HomePageContainer>
    </ThemeProvider>
  );
};


export default Infobengin;
