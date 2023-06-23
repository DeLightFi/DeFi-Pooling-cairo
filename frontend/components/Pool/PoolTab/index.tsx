import { useEffect, useState } from "react";
import { FaChartPie, FaLock } from "react-icons/fa";

import { Container } from "./PoolTabElements";


const PoolTab = ({ }) => {
  const mode = 'stats'
  return (
    <Container>
      {mode === 'stats' ?
        <>
          <div className="header">
            <div />
            <span>Yearn Ethereum</span>
            <span>yvWETH</span>
          </div>
          <div className="chart"></div>
          <div className="stats">
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
            <div className="repartition">
              <span>Pool Repartition</span>
              <div>
                <div />
                <div />
              </div>
            </div>
          </div>
        </>
        :
        <>

        </>
      }

    </Container>
  );
};

export default PoolTab;
