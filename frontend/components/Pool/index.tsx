import { useEffect, useState } from "react";

import { Container } from "./PoolElements";
import PoolTabSelector from "./PoolTabSelector";
import PoolTab from "./PoolTab";
import PoolTrade from "./PoolTrade";


const Pool = ({ }) => {

  return (
    <Container>
      <PoolTabSelector />
      <PoolTab />
      <PoolTrade />
    </Container>
  );
};

export default Pool;
