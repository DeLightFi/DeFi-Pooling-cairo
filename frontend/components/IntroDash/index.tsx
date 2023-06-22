import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';
import { BorderWrapperInit } from "../Home/Wallet/WalletElements";


const GradientAnimation = keyframes`
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

const Title = styled.div`
  background: linear-gradient(270deg, 
    ${({ theme }) => theme.colors.starkenLogo1}, 
    ${({ theme }) => theme.colors.starkenLogo2});
  background-size: 200% 200%;
  animation: ${GradientAnimation} 25s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: 2.8em;
  text-align: center;
  font-weight: bold;
`;

const SubTitle = styled.div`
  color: ${({ theme }) => theme.colors.color1};
  font-size: 1.5em;
  text-align: center;
  font-weight: medium;

`;



const GetStarted = styled.div`
  color: ${({ theme }) => theme.colors.color1};
  padding: 15px;
  text-align: center;
  text-decoration: none;
  font-size: 1em;
  border: none;
  border-radius: 5px;
`;

const FlexContainerTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;
  img{
    width: 70%;
  }

`;



const FlexContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 240px);
  justify-content: center;
  gap: 1.8em;
  img{
    height: 40%;
  }
`;


const LilFlex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2em;
  img{
    height: 40%;
  }
`;


const IntroDash = () => {
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    setStarted(true);
  }

  return (
    <FlexContainer>
      <img src="/img/logo.png" />
      <LilFlex>
        <Title>Portfolio tracking</Title>
        <SubTitle>Built on Starknet</SubTitle>
      </LilFlex>
    </FlexContainer>
  );
};

export default IntroDash;
