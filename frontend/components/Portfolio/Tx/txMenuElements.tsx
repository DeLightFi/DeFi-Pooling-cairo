import styled from "styled-components";




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


export const BorderWrapperEmpty = styled.div`
  background-color: ${(props) => props.theme.colors.bg1};
  padding: 2px;
  border-radius: 5px;
`;

export const ButtonGrid = styled.div`
width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  background-color: ${(props) => props.theme.colors.bg2};
  padding: 5px;
  border-radius: 5px;
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
  padding: 5px;

  font-size: medium;
  cursor: pointer;
  background-color: ${(props) => props.theme.colors.bg1};
  color: ${(props) => (props.theme.colors.color1)};
`;
