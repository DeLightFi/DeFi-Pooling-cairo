import styled from "styled-components";

export const Title = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: bold;

  font-size: 0.8rem;
  margin-bottom: 1.5%;

  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.color1};
`;

export const GridContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-flow: row;

  @media only screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const IntegrationCardParent = styled.div`
  height: 130px;
  position: relative;
  background: ${({ theme }) => theme.colors.bg2};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: right;
  justify-content: center;

  
  button{
    width: 100%;
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    cursor: pointer;
  }

  :hover{
    div:nth-child(2){
      display: none;
    }
  }
`;

export const IntegrationCardBack = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px 30px;
  position: absolute;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  span:nth-child(1){
    font-size: 1.2rem;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.color2};
  }

  span:nth-child(2){
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.color3};
  }
`;

export const IntegrationCardFront = styled.div`
  height: 100%;
  width: 100%;
  padding: 10px 30px;
  z-index: 1;
  background: ${({ theme }) => theme.colors.bg2};
  border-radius: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img{
    width: 60px;
    height: 60px;
    border-radius: 100%;
    border: 4px solid ${({ theme }) => theme.colors.bg1};
    background-color: ${({ theme }) => theme.colors.bg1};
  }
`;