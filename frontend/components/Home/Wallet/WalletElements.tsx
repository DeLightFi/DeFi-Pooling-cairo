import styled, { keyframes } from "styled-components";


export const ButtonAndFilterContainer = styled.div`
  position: relative;
`
export const FilterButton = styled.div`
  color: ${({ theme }) => theme.colors.color1};;
  padding: 8px;
  border-radius: 5px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg2};
  overflow: hidden;
`
export const LinkedButton = styled.div`
  color: ${({ theme }) => theme.colors.color1};;
  padding: 8px;
  border-radius: 5px;
  font-weight: 300;
  text-decoration: none;
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.colors.bg2};
  overflow: hidden;
`;

export const LinkedButtonLight = styled.a`
  color: ${({ theme }) => theme.colors.color1};;
  padding: 8px;
  border-radius: 5px;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  overflow: hidden;
  width: fit-content;
`;


const GradientAnimation = keyframes`
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
`;

export const BorderWrapperInit = styled.div`
  padding: 2px;
  border-radius: 5px;
  background: linear-gradient(270deg, 
    ${({ theme }) => theme.colors.starkenLogo1},
    ${({ theme }) => theme.colors.starkenLogo2});
  background-size: 200% 200%;
  animation: ${GradientAnimation} 25s linear infinite;
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



export const Container = styled.div`
  display: flex;
  flex-direction: column;
 align-items: center;
 gap: 1em;
 padding-inline: 10px;
`


export const FirstCoTitle = styled.div`
 font-weight: bold;
 font-size: medium;
`

export const FirstCoSubTitle = styled.div`
 font-weight: light;
 font-size: small;
 text-align: center;
`


export const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${({ theme }) => theme.colors.bg2};
  border-radius: 5px;
  width: 355px;
  height: 200px;
  z-index: 4;
  margin-top: 10px;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
`

export const FilterHeader = styled.div`
  cursor: pointer;
  margin-bottom: 1em;
  font-weight: 100;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.color1};
`

export const ScrollableContainer = styled.div`
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  gap: 5px;
  max-height: 80%;
`
export const FilterCard = styled.div`
  width: 95%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
  cursor: pointer;
  color: white;
  border-top: solid 0.1px white;
  transition: background-color 0.3s ease; // Add this line

  &:hover {
    background-color: ${({ theme }) => theme.colors.bg1};
  }
`

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

export const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  gap: 10px;

  @media only screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const WalletCard = styled.div`
width: 95%;
  padding: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => `linear-gradient(135deg, ${theme.colors.starkenLogo1} 10%, ${theme.colors.starkenLogo2} 120%)`};
  border-radius: 10px;


  svg{
    z-index: 1;
    color:${({ theme }) => theme.name === 'dark' ? theme.colors.bg1 : theme.colors.color1};
    cursor: pointer;
  }
`;

export const FlexIcon = styled.div`
display: flex;
gap: 15px;
`

export const NameWalletCard = styled.div`
    color:${({ theme }) => theme.colors.bg1};
    text-transform: uppercase;
    font-weight: bold;
    font-size: 1.2rem;
`

export const AddressWalletCard = styled.div`
    color:${({ theme }) => theme.colors.color1};
    font-weight: normal;
    font-size: 0.8rem;
`

export const FlexNameAdd = styled.div`
display: flex;
flex-flow: column;
gap: 2px;
`

export const ModalContainer = styled.div`

  display: flex;
  flex-direction: column;

  @media only screen and (max-width: 420px) {
    height: auto;
    margin-bottom: 10%;
  }

  span{
    text-align: justify;
    font-size: 0.8rem;
  }

  .form{
    margin-top: 1.5%;
    display: flex;
    flex-direction: column; 
    gap: 5px;

    @media only screen and (max-width: 420px) {
      width: 100%;
    }

    label{
      font-family: Montserrat, Helvetica;
    }
    input{
      font-family: inherit;
      border: 0;
      border-bottom: 2px solid $gray;
      outline: 0;
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.color1};
      padding: 7px 0;
      background: transparent;
      transition: border-color 0.2s;
      border-image-slice: 1;
      border-bottom: 1px solid ${({ theme }) => theme.colors.bg2};

      &::placeholder {
        color: ${({ theme }) => theme.colors.color3};
      }

      &:focus{
        border-bottom: 1px solid ${({ theme }) => theme.colors.color1};
      }
    }

    .color{
      display: flex;
      flex-direction: row;
      height: 30px;
      justify-content: space-between;
      margin-bottom: 10px;
    }

    div{
      margin-top: 1.5%;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button{
        padding: 6px  15px;
        border-radius: 5px;
        background: ${({ theme }) => theme.colors.bg2};
        color: inherit;
        border: none;
        cursor: pointer;

        :hover{
          color: ${({ theme }) => theme.colors.color1};
        }
      }
    }
  }
`;

export const Circle = styled.div`
  width: 30px!important;
  height: 30px!important;
  border-radius: 30px;
  background: ${({ color }) => color};
  border: 4px solid ${({ theme }) => theme.colors.bg1};
  cursor: pointer;

  &.selected {
    border: 4px solid ${({ theme }) => theme.colors.color2};
  }
`