import styled, { keyframes } from 'styled-components';

const loading = (props) => keyframes`
  0% {
    background-color: ${props.theme.colors.color3};
  }

  100% {
    background-color: ${props.theme.colors.bg1};
  }
`

export const Tx = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 70px;
  margin-right: 15px;

  div{
    height: 25px;
    width: 25px;
    border-radius: 25px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;

export const TxInfos = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  height: 100%;
  gap: 2px;

  span:first-child{
    height: 12px;
    width: 80px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }

  span:nth-child(2){
    height: 8px;
    width: 40px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;

export const TxDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 40%;
  height: 100%;
  gap: 2px;

  span:first-child{
    height: 18px;
    width: 40px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }

  span:nth-child(2){
    height: 10px;
    width: 100px;
    border-radius: 5px;

    opacity: .7;
    animation: ${loading} 1s linear infinite alternate; 
  }
`;