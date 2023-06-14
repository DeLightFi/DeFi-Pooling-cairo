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
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  letter-spacing: -0.075em;
  color: ${({ theme }) => theme.colors.color2};
`;

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
    height: 50px;
    width: 190px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate;
  }
`

export const FlexCol2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  

  span {
    height: 30px;
    width: 100px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate;
  }

  span:last-child {
    height: 10px;
    width: 70px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate;
  }
`

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`