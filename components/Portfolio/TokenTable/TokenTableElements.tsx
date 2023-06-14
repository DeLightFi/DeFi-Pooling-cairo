import styled from 'styled-components';

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


export const ClickableType = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.bg2};
  border-radius: 8px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  position: relative; 

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg1};
  }
`;


export const LogoAndName = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  span{
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: -0.06em;
  color: ${({ theme }) => theme.colors.color3};
  mix-blend-mode: normal;
  }

img{
    width: 50px;
    height: 40px;
    border-radius: 50%;
  }
`;


export const TypeUsdAndAllocation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
  span:first-child {
  font-style: bold;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.color1};
  }

  span{
  font-style: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.color3};
  }

`;



export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

export const HoldingTypesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;



export const TokensFlex = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap:2px;
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`

export const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  div:last-child{
    font-size: 10px;
  }
`

export const TokenLine = styled.div`
  width: 100%;
  height: 70px;
  display: grid;
  padding:2%;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg2};
    img {
      width: 87px;
      height: 35px;
    } 

  @media only screen and (max-width: 420px) {
    img {
      width: 70px;
      height: 28px;
    }
  }
`;
export const TokenLineInit = styled.div`
  width: 100%;
  padding:2%;
  
  display: grid;
  grid-template-columns: 3fr 1fr 1fr 1fr;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg2};
  position: relative;

  img {
    width: 87px;
    height: 35px;
  } 

  div {
    font-weight: light;
  }

  &:after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(to right, ${({ theme }) => theme.colors.starkenLogo1}, ${({ theme }) => theme.colors.starkenLogo2});
  }

  @media only screen and (max-width: 420px) {
    img {
      width: 70px;
      height: 28px;
    }
  }
`;




export const TokenNamePlace = styled.div`
  margin-left: 30px;
`

export const TokenName = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  text-align: left!important;

  span:nth-child(1){
    font-weight: 600;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.color1};
  }

  span:nth-child(2){
    font-weight: 400;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.color3};
  }

  @media only screen and (max-width: 420px) {
    display: none;
  }
`