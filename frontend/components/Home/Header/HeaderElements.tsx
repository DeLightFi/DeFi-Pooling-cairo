import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 30px;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

export const Title = styled.span`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.color1};

  @media only screen and (max-width: 420px) {
    display: none;
  }
`;

export const Search = styled.div`
  height: 40px;
  width: 400px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.bg2};

  border-radius: 10px;

  svg{
    cursor: pointer;
  }

  @media only screen and (max-width: 420px) {
    width: 100%;
    padding: 0 10px;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 5px;
  width: 90%;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }

  label{
    font-family: Montserrat, Helvetica;
  }
  input{
    font-family: inherit;
    width: 100%;
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

    :-webkit-autofill{
      -webkit-text-fill-color: ${({ theme }) => theme.colors.color1} !important;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover, 
  input:-webkit-autofill:focus, 
  input:-webkit-autofill:active{
      -webkit-box-shadow: ${(props) => `0 0 0 30px ${props.theme.colors.bg2} inset !important`};
  }
`;