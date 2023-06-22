import Image from "next/image";
import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 240px);
  position: relative;

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

  @media only screen and (max-width: 420px) {
    height: 55vh;

    .recharts-responsive-container{
      width: 100%!important;
      height: 55%!important;
      margin-top: 15vh;
    }
    margin-bottom: 20px;
  }

`;


export const FlexCol = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FilterBox = styled.div`
  width: 100%;
  height: 150px;
`;



export const FilterColumn = styled.div`
  display: flex;
  flex-direction: column;
  /* Adjust width as needed */
  width: 250px;
`;

type RelativeContainerProps = {
  isFilterOpen: boolean;
};

export const RelativeContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;






export const AbsoluteFilter = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 35%;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  height: 100%;
`;



type ChartContainerProps = {
  width: string;
};

export const ChartContainer = styled.div<ChartContainerProps>`
  width: ${props => props.width};
  height: 100%;
  align-self: baseline;
`;


export const AnalyticsGraphWrapper = styled.div`
  flex-grow: 1;
  min-height: 0; /* Or some other minimum height */
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
  padding: 20px 20px;

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

export const Selector = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  
  @media only screen and (max-width: 420px) {
    width: 80%;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  svg {
    cursor: pointer;
    margin-right: 10px;
  }
`;

export const ButtonGroup = styled.div`
  height: 30px;
  display: flex;
  flex-direction: row;

  @media only screen and (max-width: 420px) {
    width: 100%;
    justify-content: space-between;
  }

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-size: 14px;
    font-weight: 600;
    height: 30px;
    width: 40px;
    padding: 0;
    border-radius: 0px;
    background: ${({ theme }) => theme.colors.bg1};
    border-width: 0;
    border-radius: 5px;

    cursor: pointer;

    margin-right: 2.5px;
    margin-left: 2.5px;
    color: ${({ theme }) => theme.colors.color1};
  }

  button:hover {
    background: ${({ theme }) => theme.colors.color1};
    color: ${({ theme }) => theme.colors.bg1};
  }

  .focused {
    background: ${({ theme }) => theme.colors.color1};
    color: ${({ theme }) => theme.colors.bg1};
  }
`;
