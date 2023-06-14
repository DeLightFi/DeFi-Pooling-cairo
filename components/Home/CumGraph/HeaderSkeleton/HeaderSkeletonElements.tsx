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
    height: 40px;
    width: 80px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }

  span {
    height: 20px;
    width: 110px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate;
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