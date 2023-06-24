import { useEffect, useState } from "react";
import moment from "moment";
import {
  ComposedChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Container } from "./PoolTabStatsElements";


const PoolTabStats = ({ connection, setConnection }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum", {
      "body": "{\"query\":\"{\\n\\t\\t\\tvaultDailySnapshots(\\n\\t\\t\\t\\twhere: {vault: \\\"0xa258c4606ca8206d8aa700ce2143d7db854d168c\\\"}\\n\\t\\t\\t\\torderBy: timestamp\\n\\t\\t\\t\\torderDirection: asc\\n\\t\\t\\t\\tfirst: 1000\\n\\t\\t\\t) {\\n\\t\\t\\t\\tpricePerShare\\n\\t\\t\\t\\ttotalValueLockedUSD\\n\\t\\t\\t\\ttimestamp\\n\\t\\t\\t}\\n\\t\\t}\"}",
      "method": "POST"
    }).then(response => response.json()).then(data => setData(data.data.vaultDailySnapshots));
  }, []);


  return (
    <Container>
      <div className="header">
        <div />
        <span>Yearn Ethereum</span>
        <span>yvWETH</span>
      </div>
      <div className="chart">
        <div className="apy">
          <div>
            <span>APY</span>
            <span>0.00%</span>
          </div>
        </div>
        <ResponsiveContainer className="rechart">
          <ComposedChart data={data}>
            <XAxis
              scale="time"
              dataKey="timestamp"
              axisLine={false}
              tickLine={false}
              tickFormatter={(ts) => moment(new Date(+ts)).format("DD MMMM YYYY")}
              tick={false}
            />
            <Area
              type="monotone"
              dataKey="totalValueLockedUSD"
              stackId="1"
              stroke="#e6e452"
              strokeWidth={1}
              fill="transparent"
              fillOpacity="1"
            />
            {/* <Tooltip cursor={{ stroke: "#25262d6a", strokeDasharray: 5 }} /> */}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      <div className="stats">
        <div className="figures">
          <div>
            <span>Layer 1 (ETH)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
          <div>
            <span>Layer 2 (Starknet)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>0.00</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>0.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className="repartition">
          <span>Pool Repartition</span>
          <div>
            <div />
            <div style={{ width: `${58.5}%` }} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabStats;
