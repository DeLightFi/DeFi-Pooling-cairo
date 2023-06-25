import { Container } from "./PoolTabProofElements";


const PoolTabProof = ({ connection, setConnection }) => {
  return (
    <Container>
      <div className="header">
        <div />
        <span>Yearn Ethereum</span>
        <span>yvWETH</span>
      </div>
      <h3>Equilibrate the pool</h3>
      <div className="equilibrate">
        <div className="repartition">
          <span>Pool Repartition</span>
          <div>
            <div />
            <div style={{ width: `${58.5}%` }} />
          </div>
          <span className="value" style={{ marginLeft: `calc(${58.5}% - 10%)` }}>{`${58.5}%`}</span>
        </div>
        <div className="btn">
          <span>The actual repartition being upper than 15%, you can equilibrate the pool by bridging funds from L1 to L2.</span>
          <button>Bridge</button>
        </div>
      </div>
      <h3>Submit a proof</h3>
      <div className="proof">
        <div className="figures">
          <div>
            <span>Layer 1 (ETH)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
          <div>
            <span>Layer 2 (Starknet)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="btn">
          <span>The actual proof is no more up to date, you can submit a new one and be rewarded.</span>
          <button>Proove</button>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabProof;
