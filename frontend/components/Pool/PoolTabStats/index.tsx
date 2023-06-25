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
import { fetchL1Allocation, fetchL1L2Allocation, fetchL2Allocation, fetchL2L1Allocation, fetchlastDataProverAddress, fetchlastL1BridgerAddress, fetchlastL2BridgerAddress, fetchTotalRewards, fetchTvl, formatNumber, shortenAddress } from "../../../utils";
import styled from "styled-components";

interface IUserReward {
  user_address: string;
  pendingRewards: number;
}


const RowData = styled.div`
width: 70%;
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

const Flexrow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`




const RewardsSpace = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 20px;
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
  gap: 30px;
  align-items: left;

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
  const [l2Alloc, setL2Alloc] = useState<number>(0);
  const [l2l1Alloc, setL2L1Alloc] = useState<number>(0);
  const [l1Alloc, setL1Alloc] = useState<number>(0);
  const [l1l2Alloc, setL1L2Alloc] = useState<number>(0);


  const [tvl, setTvl] = useState<number>(0)
  const [l1Allocation, setL1Allocation] = useState<number>(0)


  useEffect(() => {
    const fetchDataP = async () => {
      const [l1Capital, totalCapital] = await Promise.all([
        fetchL2Allocation(),
        fetchTvl()
      ]);

      const l2_allocation = l1Capital / totalCapital
      setL1Allocation(100 - (l2_allocation * 100));
    };

    fetchDataP();
  }, []);

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

    const fetchDataSpread = async () => {
      const [a, b, c, d] = await Promise.all([
        fetchL2Allocation(),
        fetchL2L1Allocation(),
        fetchL1Allocation(),
        fetchL1L2Allocation(),
      ]);
      setL2Alloc(a)
      setL2L1Alloc(b)
      setL1Alloc(c)
      setL1L2Alloc(d)
    };

    fetchData();
    fetchDataSpread();


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
          <RewardsSpace>

            <TVLData>
              <BigText>
                Mirror TVL
              </BigText>
              <HugeText>
                {formatNumber(tvl)}
              </HugeText>

            </TVLData>
            <Flexrow>
              <FlexCol>
                <LightText>
                  L2 Reserve
                </LightText>
                <BigText>
                  {l2Alloc.toPrecision(2)}
                </BigText>
              </FlexCol>
              <FlexCol>
                <LightText>
                L2 -> l1
                </LightText>
                <BigText>
                  {l2l1Alloc.toPrecision(2)}
                </BigText>
              </FlexCol>
              <FlexCol>
                <LightText>
                  L1 Reserve
                </LightText>
                <BigText>
                  {l1Alloc.toPrecision(2)}
                </BigText>
              </FlexCol>
              <FlexCol>
                <LightText>
              L1 -> l2
                </LightText>
                <BigText>
                  {l1l2Alloc.toPrecision(2)}
                </BigText>
              </FlexCol>
            </Flexrow>
          </RewardsSpace>
          <RewardsSpace>
            <BigText>
              Protocol Participants
            </BigText>
            {
              dataProviderRewards && l1BridgerRewards && l2BridgerRewards &&
              <RewardsData>
                <RewardBox>
                  <AddressText>
                    Participant
                  </AddressText>
                  <AddressText>
                    Address
                  </AddressText>
                  <AddressText>
                    Rewards
                  </AddressText>
                </RewardBox>


                <RewardBox>
                  <AddressText>
                    Data Provider
                  </AddressText>
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
                    L1 Bridger
                  </AddressText>
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
                    L2 Bridger
                  </AddressText>
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
                      (l2BridgerRewards.pendingRewards.toPrecision(2))
                    }
                  </PendingRewardsText>
                </RewardBox>
              </RewardsData>
            }
          </RewardsSpace>
        </RowData>
        <div className="repartition">
          <span>L1 allocation</span>
          <div>
            <div />
            <div style={{ width: `${l1Allocation}%` }} />
          </div>
          <span className="value" style={{ marginLeft: `calc(${l1Allocation}% - 10%)` }}>{`${l1Allocation.toPrecision(2)}%`}</span>
          <br />
          <span className="infos">The mirror Vault apy is equal to the L1Allocation multiplied by the APY of the L1 underlying strategies.
            In order to equilibrate this value, you have the possibility to bridge funds using the <FaLayerGroup /> tab.</span>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabStats;
