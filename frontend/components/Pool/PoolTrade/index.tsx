import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { Container } from "./PoolTradeElements";


const PoolTrade = ({ }) => {
  const [mode, setMode] = useState("deposit");

  return (
    <Container>
      <span className="title">Make a trade</span>
      <div className="trade">
        {mode === "deposit" ?
          <div className="btn selected" onClick={() => setMode('deposit')}>
            <div>
              <FaArrowDown />
            </div>
            <span>Deposit</span>
          </div>
          :
          <div className="btn" onClick={() => setMode('deposit')}>
            <span className="unselected">Deposit</span>
          </div>
        }
        {mode === "reedem" ?
          <div className="btn selected" onClick={() => setMode('reedem')}>
            <span>Reedem</span>
            <div>
              <FaArrowUp />
            </div>
          </div>
          :
          <div className="btn" onClick={() => setMode('reedem')}>
            <span className="unselected">Reedem</span>
          </div>
        }
      </div>
      <div className="value">
        <span>How much</span>
        <input type="text" />
      </div>
      <div className="submit">
        <button>Submit</button>
      </div>
    </Container>
  );
};

export default PoolTrade;
