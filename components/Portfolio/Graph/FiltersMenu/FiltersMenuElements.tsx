import styled from "styled-components";


export const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  background-color: ${(props) => props.theme.colors.bg2};
  padding: 5px;
  border-radius: 5px;
`;

export const Container = styled.div`
  @media only screen and (max-width: 420px) {
    display: none;
  }
`;


export const WrapperCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 8px;
  background-color: ${(props) => props.theme.colors.bg2};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const BorderWrapper = styled.div<{ selected: boolean }>`
  padding: 2px;
  border-radius: 5px;
  background: linear-gradient(
    ${({ theme, selected }) =>
    selected ? theme.colors.starkenLogo1 : theme.colors.bg1},
    ${({ theme, selected }) =>
    selected ? theme.colors.starkenLogo2 : theme.colors.bg1}
  );
  transition: background 0.3s;

  &:hover {
    background: linear-gradient(
      ${({ theme }) => theme.colors.starkenLogo1},
      ${({ theme }) => theme.colors.starkenLogo2}
    );
  }
`;



export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

`;

export const Button = styled.button`
  font-family: Montserrat, Helvetica;
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 5px;
  padding: 8px;

  font-size: medium;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.bg1};
  color: ${(props) => (props.theme.colors.color1)};
  width: 100px;
`;
