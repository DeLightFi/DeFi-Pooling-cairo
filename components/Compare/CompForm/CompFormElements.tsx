import styled from "styled-components";


export const FormWrapper = styled.div`
  margin-top: 1.5%;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  gap: 10px;
  
  svg{
    margin-top: 10px;
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.color3};

    :hover{
      color: ${({ theme }) => theme.colors.color1};
      cursor: pointer;
    }
  }
`;

export const Form = styled.div`
  margin-top: 1.5%;
  display: flex;
  flex-direction: column; 
  gap: 5px;
  width: 40%;

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
  }
`;
