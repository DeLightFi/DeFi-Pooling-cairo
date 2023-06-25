import { Container } from "./PoolTabAboutElements";


const PoolTabAbout = ({ }) => {
  return (
    <Container>
      <h3>This is mirror</h3>
      <span>
        Joining, leaving, and re-balancing a L1 Pool is expensive, often prohibitively so. Layer 2 (L2) transaction pooling and matching enables sharing the transaction costs across a larger group. It has taken years and years to build a resilient DeFi ecosystem on Ethereum, with deep liquidity and more complex strategies.
        This POC aims to provide an innovative solution in this transitioning phase while we have most of the liquidity and usability still on L1.
      </span>
      <h3>Thanks to third-parties protocol</h3>
      <div className="partners">
        <div>
          <img src="https://www.pragmaoracle.com/pragma-logo.svg" alt="pragma" />
          <span>Organizing the first starknet - cairo 1 hackathon.</span>
        </div>
        <div>
          <img src="https://www.herodotus.dev/logo-full-blue-white.svg" alt="herodotus" />
          <span>Providing interaction between L2 and L1.</span>
        </div>
        <div>
          <img src="https://www.pragmaoracle.com/assets/ecosystem/argent.png" alt="argent" />
          <span>Offering web wallet solution for developpers.</span>
        </div>
        <div>
          <img src="https://altcoinsbox.com/wp-content/uploads/2023/03/full-yearn-finance-logo.png" alt="yearn" />
          <span>Trading the best vaults.</span>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabAbout;
