import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { Container, Title, StatusCard } from "./StatusElements";

import tokens from "./tokens.json";

const Status = ({ lastblock, data }) => {
  return (
    <>
      <Title>Starken Indexer</Title>
      <Container>
        <span>The current block on starknet mainnet is <span>{lastblock}</span>.</span>
        {tokens.map(function (token, key) {
          return (
            <StatusCard key={key}>
              <div>
                <span>
                  {token.unique_id}
                </span>
                <span>
                  Last indexed block: {data[`${token.unique_id}`]}
                </span>
              </div>
              {+data[`${token.unique_id}`] - lastblock >= -3 ?
                <FaCheckCircle />
                :
                <FaExclamationCircle />
              }
            </StatusCard>
          );
        })}
      </Container>
    </>
  );
};

export default Status;
