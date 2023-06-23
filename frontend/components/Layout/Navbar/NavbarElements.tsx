import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 60px;
  padding: 20px 40px 0 40px;

  display: flex;
  flex-direction: row;

  align-items: left;
  justify-content: space-between;

  span{
    font-size: 20px;
  }

  div{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;

    background-color: #000000;
    color: #ffffff;
    border: 1px solid #424445;
    border-radius: 20px;
    height: 30px;
    padding: 0 20px;

    cursor: pointer;
  }
`;
