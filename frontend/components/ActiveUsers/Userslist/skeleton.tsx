import { Container, Title, CatTitle, TokenLine, TokenName, ImgWrapper } from "./TokenTableSkeletonElements";

const TokenTableSkeleton = () => {
  const mock = ["", "", "", ""];
  return (
    <div className="tokentable">
      <Title>Tokens</Title>
      Evolution of the TVL for each of your coins during the selected period of time.
      <Container>
        <CatTitle>Wallet</CatTitle>
        {mock.map(function (unique_id, k2) {
          return (
            <TokenLine key={k2}>
              <ImgWrapper>
                <div />
              </ImgWrapper>
              <TokenName>
                <span />
                <span />
              </TokenName>
              <div />
              <div />
              <div />
            </TokenLine>
          )
        })}
      </Container>
    </div>
  );
};

export default TokenTableSkeleton;
