import styled from "styled-components";

export const Container = styled.div`
  width: 68vw;
  height: 100%;

  padding: 1.5vw;

  display: flex;
  flex-direction: column;

  align-items: flex-start;
  justify-content: flex-start;

  border-radius: 10px;
  background-image: url(data:image/png;base64,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);
  background-color: #25262d;

  .header{
    height: 10%;
    width: 100%;

    display: flex;
    flex-direction: row;

    align-items: center;
    gap: 2%;

    padding-bottom: 1%;
    border-bottom: 1px solid #dadada30;

    >div{
      height: 80%;
      aspect-ratio: 1/1;
      border-radius: 100%;
      background-color: #dadada;  
    }

    >span:nth-child(2){
      font-size: 1.8vw;
      font-weight: 600;
      color: #fff;
    }

    >span:nth-child(3){
      font-size: 1vw;
      font-weight: 500;
      color: #dadada;
    }
  }

  .chart{
    height: 55%;
    width: 100%;

    padding-bottom: 1%;
    border-bottom: 1px solid #dadada30;
  }

  .stats{
    height: 35%;
    width: 100%;

    display: flex;
    flex-direction: row;
    gap: 2%;

    .figures{
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      >div{
        display: flex;
        flex-direction: column;

        span{
          font-size: 1.2vw;
          color: #dadada30;;
          padding-bottom: 1%;
        }

        >div{
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          >div{
            display: flex;
            flex-direction: column;

            span:nth-child(1){
              font-size: 1vw;
              color: #dadada60;
            }

            span:nth-child(2){
              font-size: 1.5vw;
              font-weight: 600;
              color: #fff;
            }

          }
        }
      }
    }

    .repartition{
      width: 50%;
      padding: 0 2%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 2%;

      >span{
          font-size: 1vw;
          color: #dadada60;
      }

      >div{
        width: 100%;
        height: 10px;

        position: relative;

        div:nth-child(1){
          position: absolute;
          top: 0;
          left: 0;

          width: 100%;
          height: 10px;

          background-color: #dadada30;
          border-radius: 10px;
        }

        div:nth-child(2){
          position: absolute;
          top: 0;
          left: 0;

          width: 12.3%;
          height: 10px;

          background-color: #e6e452;
          border-radius: 10px;
        }
      }
    }
  }
`;
