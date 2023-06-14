import { Container, Title, StatusCardSkeleton } from "./StatusElements";

import tokens from "./tokens.json";

const StatusSkeleton = ({ }) => {
  return (
    <>
      <Title>Starken Indexer</Title>
      <Container>
        <span className="skeleton" />
        {tokens.map(function (token, key) {
          return (
            <StatusCardSkeleton key={key}>
              <div>
                <span />
                <span />
              </div>
              <div />
            </StatusCardSkeleton>
          );
        })}
      </Container>
    </>
  );
};

export default StatusSkeleton;
