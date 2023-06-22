import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-weight: 600;

  color: ${({ theme }) => theme.colors.color1};
  background-color: ${({ theme }) => `${theme.colors.bg2}66`};
  border-radius: 10px;
  backdrop-filter: blur(5px);
`

export const TokensGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-flow: row;
  margin: 8px 0;
`;

export const Token = styled.div`
  width: 95px;  
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  span:nth-child(1){
      font-size: 18px;
      font-weight: bold;
    }

`;