import AnalyticsCumGraph from "./AreaStacked";
import Header from "./Header";

import { Container, DataRow } from "./CumGraphElements";


const CumGraph = ({ data, wallets, theme }) => {

  let first_tvl_dollars_total = 0;
  let last_tvl_dollars_total = 0;
  let tvl_evolution = "0";

  if (data.length > 0) {
    wallets.forEach((wallet, i) => {
      first_tvl_dollars_total += +data[0][`ad${i + 1}`];
      last_tvl_dollars_total +=
        +data[data.length - 1][`ad${i + 1}`];
    });

    tvl_evolution = (
      ((last_tvl_dollars_total - first_tvl_dollars_total) / first_tvl_dollars_total) *
      100
    ).toFixed(2);

    if (tvl_evolution[0] !== "-") {
      tvl_evolution = "+" + tvl_evolution;
    }
  }

  const tvl = {
    first: first_tvl_dollars_total,
    last: last_tvl_dollars_total,
    evo: tvl_evolution,
  }

  return (
    <>
      <Header tvl={tvl} />
      <Container>
        <DataRow />
        <AnalyticsCumGraph data={data} wallets={wallets} theme={theme} />
      </Container>
    </>
  );
};

export default CumGraph;
