import styled from "styled-components";

export const Container = styled.div`
  width: calc(100% - 6vw - 68vw - 20px);
  height: 100%;

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

    border-radius: 30px;
    border: 1px solid #000;

    font-size: 1.2vw;
    
    .btn{
      width: 50%;
      cursor: pointer;

      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      &.selected{
        border: 1px solid #000;
        border-radius: 30px;
      }

      div{
        height: 3.5vw;
        width: 3.5vw;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        border-radius: 30px;
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
  }

  .submit{
    button{
      height: 3.5vw;
      width: 100%;
      border-radius: 30px;
      color: #fff;
      background-color: #000;
    }
  }
`;
