import { useEffect, useState } from "react";
import { FaChartPie, FaLock } from "react-icons/fa";

import { Container } from "./PoolTabSelectorElements";


const PoolTabSelector = ({ }) => {

  return (
    <Container>
      <div>
        <FaChartPie />
      </div>
      <div>
        <FaLock />
      </div>
    </Container>
  );
};

export default PoolTabSelector;
