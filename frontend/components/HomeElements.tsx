import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  gap: 40px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 0px;
  background: radial-gradient(28.91% 81.86% at 6.93% 9.5%, #FFFFFF 0%, rgba(254, 254, 255, 0.81) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */;
  box-shadow: -16px -20px 150px rgba(248, 227, 212, 0.33);
  border-radius: 17.8007px;
`;

export const SearchContainer = styled.div`
  height: 6vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  padding: 0 15px;

  background-color: rgba(17, 24, 39, 0.25);
  border-radius: 10px;
  backdrop-filter: blur(18px);
  border: 1px solid rgba(28, 30, 53, 0.3);

  svg {
    :hover {
      fill: #fe68ff;
    }
  }
`;

export const Search = styled.input`
  all: unset;
  height: 50%;
  width: 35vw;
  display: flex;
  flex-direction: row;

  color: white;
  font-size: 12px;

  ::placeholder {
    color: rgba(255, 255, 255, 0.8);
    font-size: 12px;
    display: flex;
    flex-direction: row;
  }

  background-color: transparent;
  border: none;
`;

export const Credits = styled.div`
  position: absolute;
  top: 95vh;
  left: 0;
  width: 100%;
  height: 5vh;

  padding-bottom: 10px;
  gap: 40px;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;

  /* color: #fe68ff;
  font-weight: 600; */
`;

export const CreditsWord = styled.div``;
