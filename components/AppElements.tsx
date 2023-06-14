import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 420px) {
    flex-direction: column;
  }
`;

export const Main = styled.div`
  height: 100%;
  width: 82%;

  margin-left: 18%;

  display: flex;
  flex-direction: column;

  padding: 1%;

  @media only screen and (max-width: 420px) {
    height: calc(100% - 60px);
    width: 100vw;
    padding: 6%;

    margin-left: 0;
    margin-bottom: 60px;
  }
`;

export const MainSection = styled.div`
  display: flex;
`;

export const GraphSection = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
  max-height: 100vh;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

export const SelectWallet = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 100vh;

  @media only screen and (max-width: 420px) {
    width: 100%;
  }
`;

export const TxSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 0 0 20px;
  width: 30%;
  @media only screen and (max-width: 420px) {
    width: 100%;
    padding: 0;
    margin-bottom: 40px;
  }
`;

export const Title = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 30px;

  color: ${({ theme }) => theme.colors.color1};
  mix-blend-mode: normal;
`;

export const Title2 = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  letter-spacing: -0.06em;

  color: ${({ theme }) => theme.colors.color1};
  mix-blend-mode: normal;
`;

export const Subtitle = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: 400;
  
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.color2};
  opacity: 0.7;

  margin-bottom: 1.5%;
`;

export const SectionTitle = styled.div`
  font-family: Montserrat, Helvetica;
  font-style: normal;
  font-weight: bold;

  font-size: 0.8rem;
  margin-top: 2.5%;
  margin-bottom: 1.5%;

  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.color1};
`;