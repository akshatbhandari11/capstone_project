// Header.js
import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #001f3f;
  color: #fff;
  font-size: 15px;
  padding: 2px;
  width: 100%;
  margin-top: -100px;
  
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <h2>Lung Cancer Detection and Staging</h2>
    </HeaderContainer>
  );
};

export default Header;
