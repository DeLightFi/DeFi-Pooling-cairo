import { useEffect, useState } from "react";
import { FaLayerGroup } from "react-icons/fa";
import moment from "moment";
import {
  ComposedChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Container } from "./PoolTabStatsElements";
import CustomTooltip from "./ChartCustomTooltip";
import { fetchlastDataProverAddress, fetchlastL1BridgerAddress, fetchlastL2BridgerAddress, fetchTotalRewards, fetchTvl, formatNumber, shortenAddress } from "../../../utils";
import styled from "styled-components";

interface IUserReward {
  user_address: string;
  pendingRewards: number;
}


const RowData = styled.div`
width: 40%;
  display: flex;
  flex-direction: row; 
  gap: 6px;
  align-items: center;
  justify-content: space-between;
`

const TVLData = styled.div`
  display: flex;
  flex-direction: column;
   
  gap: 5px;
  justify-content: space-between;
`

const RewardsSpace = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 3px;
`

const RewardsData = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 3px;
  justify-content: space-evenly;
`

const RewardBox = styled.div`
  display: flex;
  flex-direction: row; 
  justify-content: space-between;
`
const AddressText = styled.div`
  font-weight: light;
  color: #f5f5f58b;
  font-size: small;
`


const PendingRewardsText = styled.div`
  font-weight: bold;
  color: #ffffff;
  font-size: medium;
`

const HugeText = styled.div`
 font-size: 2vw;
          line-height: 1;
          font-weight: 500;
          color: #e6e452;
`



const LightText = styled.div`
  font-weight: light;
  color: #f5f5f58b;
  font-size: small;
`

const BigText = styled.div`
  font-weight: bold;
  color: #ffffff;
  font-size: medium;
`


const PoolTabStats = ({ connection, setConnection }) => {


  const [data, setData] = useState([]);
  const [dataProviderRewards, setDataProviderRewards] = useState<IUserReward>();
  const [l1BridgerRewards, setL1BridgerRewards] = useState<IUserReward>();
  const [l2BridgerRewards, setL2BridgerRewards] = useState<IUserReward>();

  const [tvl, setTvl] = useState<number>(0)

  useEffect(() => {
    fetch("https://api.thegraph.com/subgraphs/name/messari/yearn-v2-ethereum", {
      "body": "{\"query\":\"{\\n\\t\\t\\tvaultDailySnapshots(\\n\\t\\t\\t\\twhere: {vault: \\\"0xa258c4606ca8206d8aa700ce2143d7db854d168c\\\"}\\n\\t\\t\\t\\torderBy: timestamp\\n\\t\\t\\t\\torderDirection: asc\\n\\t\\t\\t\\tfirst: 1000\\n\\t\\t\\t) {\\n\\t\\t\\t\\tpricePerShare\\n\\t\\t\\t\\ttotalValueLockedUSD\\n\\t\\t\\t\\ttimestamp\\n\\t\\t\\t}\\n\\t\\t}\"}",
      "method": "POST"
    }).then(response => response.json()).then(data => {
      console.log(data.data.vaultDailySnapshots)
      const apy = data.data.vaultDailySnapshots.map((obj, index) => ({
        timestamp: obj.timestamp,
        apy: (+obj.pricePerShare - (+data.data.vaultDailySnapshots[index - 1]?.pricePerShare || 0)) / 10e18 * 365 * 100,
      }));
      setData(apy.slice(1, apy.length - 1))
    }
    );


    const fetchData = async () => {
      const [a, b, c, d, tvl] = await Promise.all([
        fetchTotalRewards(),
        fetchlastDataProverAddress(),
        fetchlastL1BridgerAddress(),
        fetchlastL2BridgerAddress(),
        fetchTvl()
      ]);

      const data_prov: IUserReward = {
        user_address: b,
        pendingRewards: a.data_prover,
      }

      const l1B: IUserReward = {
        user_address: c,
        pendingRewards: a.l1_bridger_reward,
      }

      const l2B: IUserReward = {
        user_address: d,
        pendingRewards: a.l2_bridger_reward,
      }

      setDataProviderRewards(l1B)
      setL1BridgerRewards(data_prov)
      setL2BridgerRewards(l2B)
      setTvl(tvl)

    };

    fetchData();
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
            {data.length >= 1 ?
              <span>{(+data[data.length - 1].apy).toFixed(2)}%</span>
              :
              <span>0.00%</span>
            }
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
              dataKey="apy"
              stackId="1"
              stroke="#e6e452"
              strokeWidth={1}
              fill="transparent"
              fillOpacity="1"
            />
            <Tooltip
              content={<CustomTooltip payload={data} />}
              cursor={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
        <div className="chartlegend">
          <span>Evolution of the pool APY through the time</span>
        </div>
      </div>
      <div className="stats">
        <RowData>
          <TVLData>
            <BigText>
              Mirror TVL
            </BigText>
            <HugeText>
              {formatNumber(tvl)}
            </HugeText>
            <HugeText>
              ETH
            </HugeText>
          </TVLData>
          <RewardsSpace>
            <BigText>
              Protocol Participants
            </BigText>
            {
              dataProviderRewards && l1BridgerRewards && l2BridgerRewards &&
              <RewardsData>
                <RewardBox>
                  <AddressText>
                    {
                      dataProviderRewards.user_address == "0x0" ?
                        "0"
                        :
                        shortenAddress(dataProviderRewards.user_address)
                    }
                  </AddressText>
                  <PendingRewardsText>
                    {
                      (dataProviderRewards.pendingRewards)
                    }
                  </PendingRewardsText>
                </RewardBox>
                <RewardBox>
                  <AddressText>
                    {
                      l1BridgerRewards.user_address == "0x0" ?
                        "0"
                        :
                        shortenAddress(l1BridgerRewards.user_address)
                    }
                  </AddressText>
                  <PendingRewardsText>
                    {
                      (l1BridgerRewards.pendingRewards)
                    }
                  </PendingRewardsText>
                </RewardBox>
                <RewardBox>
                  <AddressText>
                    {
                      l2BridgerRewards.user_address == "0x0" ?
                        "0"
                        :
                        shortenAddress(l2BridgerRewards.user_address)
                    }
                  </AddressText>
                  <PendingRewardsText>
                    {
                      (l2BridgerRewards.pendingRewards)
                    }
                  </PendingRewardsText>
                </RewardBox>
              </RewardsData>
            }
          </RewardsSpace>
        </RowData>
        <div className="repartition">
          <span>Pool Repartition</span>
          <div>
            <div />
            <div style={{ width: `${58.5}%` }} />
          </div>
          <span className="value" style={{ marginLeft: `calc(${58.5}% - 10%)` }}>{`${58.5}%`}</span>
          <br />
          <span className="infos">The ideal pool repartition is <b>10%</b>. In order to equilibrate this value, you have the possibility to bridge funds using the <FaLayerGroup /> tab.</span>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabStats;
