import { useEffect, useState } from "react";
import { FaChartPie, FaLock } from "react-icons/fa";

import { Container } from "./PoolTabSelectorElements";


const PoolTabSelector = ({ setMode }) => {

  return (
    <Container>
      <div onClick={() => setMode("stats")}>
        <FaChartPie />
      </div>
      <div onClick={() => setMode("proof")}>
        <FaLock />
      </div>
    </Container>
  );
};

export default PoolTabSelector;
