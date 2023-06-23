import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  max-height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: #131519;
`;

export const Main = styled.div`
  height: calc(100vh - 60px);
  min-height: calc(100vh - 60px);
  max-height: calc(100vh - 60px);
  width: 100%;
`;
