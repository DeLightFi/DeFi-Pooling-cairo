import styled from "styled-components";

export const Title = styled.div`
  margin-bottom: -10px;
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;

  letter-spacing: -0.075em;
  color: ${({ theme }) => theme.colors.color2};
`;

export const Price = styled.div`
  width: 50%;
  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 5px;

  span:first-child {
    font-size: 5vh;
    font-weight: bold;
    padding-bottom: 0;
    color: ${({ theme }) => theme.colors.color1};
  }

  span {
    padding-bottom: 0.4%;
    font-weight: 500;
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
  margin-bottom: 25px;
`

export const Filters = styled.div`
  width: 5px;
  height: 50px;
`
