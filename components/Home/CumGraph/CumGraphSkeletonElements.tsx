import styled, { keyframes } from 'styled-components';

const loading = (props) => keyframes`
  0% {
    background-color: ${props.theme.colors.color3};
  }

  100% {
    background-color: ${props.theme.colors.bg1};
  }
`

const loadingpath = (props) => keyframes`
  0% {
    fill: ${props.theme.colors.color3};
  }

  100% {
    fill: ${props.theme.colors.bg1};
  }
`

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 240px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  border-radius: 20px;
  background: ${({ theme }) => theme.colors.bg2};
  text-align: center;

  .svgwrapper{
      width: 100%;
      height: 100%;
    svg{    
      width:90%;
      height: 70%;
      path{
        opacity: .7;
        animation: ${loadingpath} 1s linear infinite alternate; 
      }
    }
  }

  /* @media only screen and (max-width: 420px) {
    height: auto;
    .svgwrapper{
      padding: 7vh 0;
    }
  } */

  @media only screen and (max-width: 420px) {
    display: none;
  }
`;

export const InfoSection = styled.div`
  width: 25%;
  height: 100%;

  border-radius: 10px;
  backdrop-filter: blur(15px);
`;

export const DataRow = styled.div`
  width: 100%;
  height: 15%;
  padding: 20px 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    align-items: left;
    padding: 20px 0px 0px 0px;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
  }
`;

export const Selector = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 25px;

  @media only screen and (max-width: 420px) {
    width: 80%;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ButtonGroup = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 420px) {
    width: 100%;
    justify-content: space-between;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: 600;
    height: 30px;
    width: 40px;
    padding: 0;
    border-radius: 0px;
    border-width: 0;
    border-radius: 5px;

    margin-right: 2.5px;
    margin-left: 2.5px;
    
    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;
