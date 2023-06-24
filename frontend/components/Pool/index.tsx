import { useEffect, useState } from "react";

import { Container } from "./PoolElements";
import PoolTabSelector from "./PoolTabSelector";
import PoolTabStats from "./PoolTabStats";
import PoolTabProof from "./PoolTabProof";
import PoolTabAbout from "./PoolTabAbout";
import PoolTrade from "./PoolTrade";
import { ConnectedStarknetWindowObject } from "@argent/get-starknet";

export default function Pool({ connection, setConnection }) {
  const [mode, setMode] = useState("stats");

  return (
    <Container>
      <PoolTabSelector setMode={setMode} />
      {mode === "stats" &&
        <PoolTabStats connection={connection} setConnection={setConnection} />
      }
      {mode === "proof" &&
        <PoolTabProof connection={connection} setConnection={setConnection} />
      }
      {mode === "about" &&
        <PoolTabAbout />
      }
      <PoolTrade connection={connection} setConnection={setConnection} />
    </Container>
  );
};

