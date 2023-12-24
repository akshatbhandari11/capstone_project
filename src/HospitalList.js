// HospitalList.js

import React from 'react';
import styled from 'styled-components';
import KokilabenImage from './K.jpeg';
import BreachCandyImage from './B.jpeg';
import AIIMSImage from './a.jpeg';
import ColombiaImage from './c.jpeg';

const HospitalListContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
`;

const SubHeading = styled.h2`
  text-align: center;
  color: #00008B;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top:-20px;
`;

const HospitalListWrapper = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  justify-content: center;
`;

const HospitalListItem = styled.li`
  display: flex;
  flex-direction: column; /* Display items in a column layout */
  align-items: center;
  margin-right: 130px;
`;

const HospitalLink = styled.a`
  color: #00008B;
  font-weight: 400;
  font-size: 18px;
  margin-top: -15px; /* Adjust spacing between image and text */
  text-align: center; 
`;

const HospitalImageLink = styled.a`
  max-width: 100px; /* Set maximum width for the image container */
`;

const HospitalImage = styled.img`
  width: 220%; /* Ensure the image takes 100% of the width of its container */
  height: 220px; /* Set the height of the image */
  object-fit: cover; /* Maintain the aspect ratio of the image and cover the container */
`;

const HospitalList = () => {
  return (
    <HospitalListContainer>
      <SubHeading>Top Hospitals for Lung Cancer Treatment</SubHeading>
      <HospitalListWrapper>
        <HospitalListItem>
          <HospitalImageLink href="https://www.kokilabenhospital.com/">
            <HospitalImage src={KokilabenImage} alt="Kokilaben Hospital" />
          </HospitalImageLink>
          <HospitalLink href="https://www.kokilabenhospital.com/">Kokilaben</HospitalLink>
        </HospitalListItem>
        <HospitalListItem>
          <HospitalImageLink href="https://www.breachcandyhospital.org/">
            <HospitalImage src={BreachCandyImage} alt="Breach Candy Hospital" />
          </HospitalImageLink>
          <HospitalLink href="https://www.breachcandyhospital.org/">Breach Candy</HospitalLink>
        </HospitalListItem>
        <HospitalListItem>
          <HospitalImageLink href="https://www.aiims.edu/index.php?lang=en">
            <HospitalImage src={AIIMSImage} alt="A.I.I.M.S, Delhi" />
          </HospitalImageLink>
          <HospitalLink href="https://www.aiims.edu/index.php?lang=en">A.I.I.M.S</HospitalLink>
        </HospitalListItem>
        <HospitalListItem>
          <HospitalImageLink href="https://medsurgeindia.com/hospital/columbia-asia-hospital-bangalore/">
            <HospitalImage src={ColombiaImage} alt="Colombia Asia, Bengaluru" />
          </HospitalImageLink>
          <HospitalLink href="https://medsurgeindia.com/hospital/columbia-asia-hospital-bangalore/">Colombia Asia</HospitalLink>
        </HospitalListItem>
      </HospitalListWrapper>
    </HospitalListContainer>
  );
};

export default HospitalList;
