import styled, { keyframes } from 'styled-components';

const loading = (props) => keyframes`
  0% {
    background-color: ${props.theme.colors.color3};
  }

  100% {
    background-color: ${props.theme.colors.bg1};
  }
`

export const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 10px;

  span{
    span{
      color: ${({ theme }) => theme.colors.accentuation};
      font-weight: bold;
    }

    &.skeleton{
      width: 35%;
      height: 14px;
      opacity: .7;
      animation: ${loading} 1s linear infinite alternate;
      color:red;

      @media only screen and (max-width: 420px) {
        width: 100%;
      } 
    }
  }
`;

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

export const StatusCard = styled.div`
  width: 30%;
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 1.5%;
  gap: 3%;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }

  div{
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 3px;

    span:nth-child(1) {
      color:${({ theme }) => theme.colors.color2};
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
    }

    span:nth-child(2) {
      color:${({ theme }) => theme.colors.color3};
      font-size: 0.7rem;
      text-transform: lowercase;
    }
  }

  svg{
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.accentuation};
  }
`;

export const StatusCardSkeleton = styled.div`
  width: 30%;
  height: 60px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 1.5%;
  gap: 3%;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }

  div{
    display: flex;
    flex-direction: column;
    align-items: left;
    gap: 3px;

    span:nth-child(1) {
      height: 22px;
      width: 60px;
      opacity: .7;
      animation: ${loading} 1s linear infinite alternate; 
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1.2rem;
    }

    span:nth-child(2) {
      height: 12px;
      width: 126px;
      opacity: .7;
      animation: ${loading} 1s linear infinite alternate; 
      font-size: 0.7rem;
      text-transform: lowercase;
    }
  }

  div:nth-child(2){
    width: 20px;
    height: 20px;
    border-radius: 100%;
    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;