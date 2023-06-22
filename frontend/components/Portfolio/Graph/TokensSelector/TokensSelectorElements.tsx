import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;



export const Token = styled.div`
  width: 100%;  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  border-top: solid 0.2px ${(props) => props.theme.colors.color1};
  transition: background-color 0.3s ease;  

  &:hover {
    background-color:${(props) => props.theme.colors.bg2}
  }

  img {
    width: 60px;
    height: 24px;
  }
`;

export const SelectAllText = styled.button`
  transition: background-color 0.3s ease;  // Adjust duration and easing function as needed

  cursor: pointer;
  font-weight: 200;
  color:  ${(props) => props.theme.colors.color1};
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.colors.bg1};
  border: none;
  :hover{
    background-color: ${(props) => props.theme.colors.bg2};
  }
`;




export const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  background-color: ${(props) => props.theme.colors.bg1};
  color: ${(props) => props.theme.colors.color1};
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;


export const FilterOption = styled.option`
  padding: 0.5rem;
`;


export interface ButtonProps {
  selected: boolean;
  hovered: boolean;
}

export const Button = styled.button<ButtonProps>`
  font-family: Montserrat, Helvetica;
  width: 100%;
  border: none;
  border-radius: 5px;
  padding: 5px;

  font-size: medium;
  cursor: pointer;
  /* background-color: ${(props) => props.selected ? props.theme.colors.starkenLogo2 : props.theme.colors.bg1}; */
  background: linear-gradient(
    ${(props) => props.selected ? props.theme.colors.starkenLogo1 : props.theme.colors.bg1},
    ${(props) => props.selected ? props.theme.colors.starkenLogo2 : props.theme.colors.bg1}
  );
  font-weight: ${(props) => (props.selected ? 'bold' : 'normal')};
  color: ${(props) => (props.selected || props.hovered ? props.theme.colors.color1 : props.theme.colors.color2)};
`;
