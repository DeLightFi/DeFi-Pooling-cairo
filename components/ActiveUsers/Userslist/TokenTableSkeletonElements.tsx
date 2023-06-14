import styled, { keyframes } from 'styled-components';

const loading = (props) => keyframes`
  0% {
    background-color: ${props.theme.colors.color3};
  }

  100% {
    background-color: ${props.theme.colors.bg1};
  }
`

export const Title = styled.div`
  margin: 3% 0px 1.5% 0px;

  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.06em;

  color: ${({ theme }) => theme.colors.color1};
  mix-blend-mode: normal;
`;

export const CatTitle = styled.div`
  margin: 3% 0px 1.5% 0px;

  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.06em;

  color: ${({ theme }) => theme.colors.color3};
  mix-blend-mode: normal;
`;

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-flow: row;

  @media only screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const TokenLine = styled.div`
  width: 100%;
  height: 80px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 1.5% 6%;
  
  mix-blend-mode: normal;
  background: ${({ theme }) => theme.colors.bg2};

  div{
    width: calc((100% -25px) / 3);
    text-align: right;
    color: ${({ theme }) => theme.colors.color1};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 87px;

  div{
    height: 35px;
    width: 35px;
    border-radius: 35px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;

export const TokenName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-left: 20px;
  text-align: left!important;

  span:nth-child(1){
    height: 1.4rem;
    width: 120px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }

  span:nth-child(2){
    height: 0.7rem;
    width: 40px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`