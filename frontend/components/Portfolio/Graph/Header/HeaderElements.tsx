import styled from "styled-components";

export const Title = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: -0.075em;
  color: ${({ theme }) => theme.colors.color2};
`;

export const Price = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;

  span:first-child {
    font-size: 5vh;
    font-weight: bold;
    color: ${({ theme }) => theme.colors.color1};
  }

  span {
    font-weight: 500;
    white-space: nowrap; 
  }

  @media only screen and (max-width: 420px) {
    width: 100%;
    text-align: left;
  }
`;

export const Pricefilters = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 25px;
  justify-content: space-between;
`

export const FlexCol1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;

  span {
    font-size: 6vh;
    font-weight: bold;
    white-space: nowrap; 
  }
`

export const FlexCol2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  

  span{
    font-size: 4vh;
    font-weight: bold;
    white-space: nowrap; 
  }

  span:last-child {
    font-size: 1.5vh;
    font-weight: normal;
    white-space: nowrap; 
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`