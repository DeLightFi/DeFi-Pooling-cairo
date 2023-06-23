import { useEffect, useState } from "react";

import { Container } from "./PoolElements";
import PoolTabSelector from "./PoolTabSelector";
import PoolTabStats from "./PoolTabStats";
import PoolTabProof from "./PoolTabProof";
import PoolTrade from "./PoolTrade";


const Pool = ({ }) => {
  const [mode, setMode] = useState("stats");

  return (
    <Container>
      <PoolTabSelector setMode={setMode} />
      {mode === "stats" ?
        <PoolTabStats />
        :
        <PoolTabProof />
      }
      <PoolTrade />
    </Container>
  );
};

export default Pool;
