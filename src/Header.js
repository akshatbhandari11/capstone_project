// Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #001f3f;
  color: #fff;
  font-size: 15px;
  padding: 10px; /* Adjust padding to your preference */
  width: 100%;
  text-align: center;
  z-index: -1; /* Ensure the header stays above other elements */
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h2>Lung Cancer Detection and Staging</h2>
    </HeaderContainer>
  );
};

export default Header;
