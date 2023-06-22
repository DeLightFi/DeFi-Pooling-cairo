import styled from 'styled-components';


export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  grid-auto-flow: row;

  @media only screen and (max-width: 420px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const Elem = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 10px;

  position: relative;
  mix-blend-mode: normal;
  background: ${({ theme }) => theme.colors.bg2};

  cursor: pointer;

  &>div{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  
  div:nth-child(2){
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 2%;

    span{
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.color1};
      span{
        font-size: 0.6rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.color1};
      }
    }

    .price{
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.color1};
      padding-bottom: 5px;
    }

    .address{
      font-size: 1.5rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.color1};
      padding-top: 10px;
    }
  }

  div:nth-child(3){
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding: 2% 2%;

    span{
      font-size: 2.4rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.color1};
      padding-top: 10px;
    }
  }
`;