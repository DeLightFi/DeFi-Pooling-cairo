import { FaChartPie, FaLayerGroup, FaInfo } from "react-icons/fa";

import { Container } from "./PoolTabSelectorElements";


const PoolTabSelector = ({ setMode }) => {

  return (
    <Container>
      <div onClick={() => setMode("stats")}>
        <FaChartPie />
      </div>
      <div onClick={() => setMode("proof")}>
        <FaLayerGroup />
      </div>
      <div onClick={() => setMode("about")}>
        <FaInfo />
      </div>
    </Container>
  );
};

export default PoolTabSelector;
