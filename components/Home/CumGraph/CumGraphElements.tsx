import styled from "styled-components";

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  height: calc(100vh - 240px);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  border-radius: 20px;
  background: ${({ theme }) => theme.colors.bg2};

  .recharts-responsive-container{
    width: 100%!important;
    height: 85%!important;
  }

  /* @media only screen and (max-width: 420px) {
    height: 40vh;
    padding-top: 10px;

    .recharts-responsive-container{
      width: 100%!important;
      height: 85%!important;
    }
  } */

  @media only screen and (max-width: 420px) {
    display: none;
  }

`;

export const InfoSection = styled.div`
  width: 25%;
  height: 100%;

  border-radius: 10px;
  backdrop-filter: blur(15px);
`;

export const DataRow = styled.div`
  width: 100%;
  height: 15%;
  padding: 20px 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
    align-items: left;
    text-align:left;
    padding: 20px 0px 0px 0px;
    justify-content: flex-start;
    gap: 20px;
    width: 100%;
  }
`;

export const Price = styled.div`
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: end;
  gap: 5px;

  span:first-child {
    font-size: 5vh;
    font-weight: bold;
    padding-bottom: 0;
    color: ${({ theme }) => theme.colors.color1};
  }

  span {
    padding-bottom: 0.4%;
    font-weight: 500;
  }

  @media only screen and (max-width: 420px) {
    width: calc(100% - 60px);
    text-align: left;
  }
`;