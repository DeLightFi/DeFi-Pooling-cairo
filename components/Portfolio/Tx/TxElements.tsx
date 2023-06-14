import styled from "styled-components";



export const TxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
  overflow-y: scroll;
  background-color: ${({ theme }) => theme.colors.bg2};
`;

export const Tx = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;

  img{
    height: 25px;
    width: 70x;
    margin-right: 15px;
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
    font-size: 12px;
    font-weight: 600;
  }

  span:nth-child(2){
    font-size: 10px;
    color: ${({ theme }) => theme.colors.color2};
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
    font-size: 16px;
    font-weight: 600;
  }

  span:nth-child(2){
    font-size: 10px;
    color: ${({ theme }) => theme.colors.color2};
  }
`;