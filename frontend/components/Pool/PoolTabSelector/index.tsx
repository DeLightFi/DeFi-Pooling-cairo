import { FaChartPie, FaLayerGroup, FaInfo } from "react-icons/fa";

import { Container } from "./PoolTabSelectorElements";


const PoolTabSelector = ({ mode, setMode }) => {

  return (
    <Container>
      <div className={mode === 'stats' ? 'selected' : ''} onClick={() => setMode("stats")}>
        <FaChartPie />
      </div>
      <div className={mode === 'proof' ? 'selected' : ''} onClick={() => setMode("proof")}>
        <FaLayerGroup />
      </div>
      <div className={mode === 'about' ? 'selected' : ''} onClick={() => setMode("about")}>
        <FaInfo />
      </div>
    </Container>
  );
};

export default PoolTabSelector;
