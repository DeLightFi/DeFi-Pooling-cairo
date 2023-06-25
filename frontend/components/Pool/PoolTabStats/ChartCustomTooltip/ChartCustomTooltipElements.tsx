import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  font-weight: 600;

  background-color: #25262d30;
  border: none;
  border-radius: 10px;
  backdrop-filter: blur(5px);

  span:nth-child(1) {
    font-size: 0.6vw;
    color: #dadada80;
  }

  span:nth-child(2) {
    font-size: 0.8vw;
    color: #e6e452;
  }
`;