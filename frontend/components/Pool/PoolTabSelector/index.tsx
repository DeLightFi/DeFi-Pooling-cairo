import { FaChartPie, FaLayerGroup, FaInfo } from "react-icons/fa";

import { Container } from "./PoolTabSelectorElements";


const PoolTabSelector = ({ setMode }) => {

  return (
    <Container>
      <div className={setMode === 'stats' ? 'selected' : ''} onClick={() => setMode("stats")}>
        <FaChartPie />
      </div>
      <div className={setMode === 'proof' ? 'selected' : ''} onClick={() => setMode("proof")}>
        <FaLayerGroup />
      </div>
      <div className={setMode === 'about' ? 'selected' : ''} onClick={() => setMode("about")}>
        <FaInfo />
      </div>
    </Container>
  );
};

export default PoolTabSelector;
