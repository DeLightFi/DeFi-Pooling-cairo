import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 6vw - 68vw - 20px);
  height: fit-content;
  padding: 2vw 1.5vw;

  display: flex;
  flex-direction: column;

  border-radius: 10px;
  background-color: #e6e452;

  color: #000;
  gap: 20px;

  .title{
    font-size: 1.8vw;
    font-weight: 600;
  }

  .trade{
    height: 3.5vw;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    border-radius: 60px;
    outline: 1px solid #25262d30;

    font-size: 1.2vw;
    
    .btn{
      width: 50%;
      cursor: pointer;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &.selected{
        transition: outline 0.2s;
        z-index: 1;
        outline: 1px solid #000;
        border-radius: 60px;
      }

      div{
        height: 3.5vw;
        width: 3.5vw;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border-radius: 60px;
        color: #fff;
        background-color: #000;
      }

      span{
        width: calc(100% - 3.5vw);
        text-align: center;

        &.unselected{
          width: 100%;
        }
      }
    }
  }

  .value{
    display: flex;
    flex-direction: column;

    span{
      font-size: 1vw;
      font-weight: 500;
    }

    input{
      height: 3.5vw;
      font-family: inherit;
      width: 100%;
      border: 1px solid #25262d30;
      border-radius: 5px;
      outline: 0;
      font-size: 0.8rem;
      color: #000000;
      padding: 2% 5%;
      background: transparent;
      border-image-slice: 1;

      &::placeholder {
        color: #25262d30;
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
  }

  .submit{
    button{
      height: 3.5vw;
      width: 100%;
      border-radius: 60px;
      border: none;
      outline: none;
      color: #fff;
      background-color: #000;

      font-family: inherit;
      font-size: 1.2vw;

      cursor: pointer;

      &:hover{
        background-color: #25262d;
      }
    }
  }
`;
