import { useEffect, useState } from "react";

import { Container } from "./PoolElements";
import PoolTabSelector from "./PoolTabSelector";
import PoolTabStats from "./PoolTabStats";
import PoolTabProof from "./PoolTabProof";
import PoolTabAbout from "./PoolTabAbout";
import PoolTrade from "./PoolTrade";


const Pool = ({ }) => {
  const [mode, setMode] = useState("stats");

  return (
    <Container>
      <PoolTabSelector setMode={setMode} />
      {mode === "stats" &&
        <PoolTabStats />
      }
      {mode === "proof" &&
        <PoolTabProof />
      }
      {mode === "about" &&
        <PoolTabAbout />
      }
      <PoolTrade />
    </Container>
  );
};

export default Pool;
