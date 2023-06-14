import styled from "styled-components";

export const Container = styled.div`
  margin-top: 10px;
  width: 100%;
  height: calc(100vh - 120px);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 20px;
  background: ${({ theme }) => theme.colors.bg2};

  .recharts-responsive-container{
    width: 100%!important;
    height: 95%!important;
  }

  @media only screen and (max-width: 420px) {
    height: 40vh;
    padding-top: 10px;

    .recharts-responsive-container{
      width: 100%!important;
      height: 85%!important;
    }
  }

`;