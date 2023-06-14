import AnalyticsCompGraph from "./AreaStacked";

import { Container } from "./CompGraphElements";


const CompGraph = ({ data, wallets, theme }) => {

  return (
    <Container>
      <AnalyticsCompGraph data={data} wallets={wallets} theme={theme} />
    </Container>
  );
};

export default CompGraph;
