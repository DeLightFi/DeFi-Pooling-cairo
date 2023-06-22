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
  margin-top: 10px;
  width: 100%;
  height: calc(100vh - 120px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 20px;
  background: ${({ theme }) => theme.colors.bg2};
  text-align: center;

  .svgwrapper{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg{    
      width:90%;
      height: 70%;
      path{
        opacity: .7;
        animation: ${loadingpath} 1s linear infinite alternate; 
      }
    }
  }

  @media only screen and (max-width: 420px) {
    height: auto;
    .svgwrapper{
      padding: 7vh 0;
    }
  }
`;
