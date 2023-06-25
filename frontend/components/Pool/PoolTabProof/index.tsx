import { useEffect, useState } from "react";
import { Call } from "starknet";
import styled from "styled-components";
import { BOOSTED_ETH, fetchL2Allocation, fetchTotalRewards, fetchTvl } from "../../../utils";
import { Container } from "./PoolTabProofElements";


const FlexRow = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  justify-content: space-evenly;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: left;
  justify-content: space-evenly;
`

const FlexColStates = styled.div`
width: 60%;
  display: flex;
  flex-direction: column; 
  align-items: left;
  justify-content: space-evenly;
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



const PoolTabProof = ({ connection, setConnection }) => {
  const [tryL1Bridge, setTryL1Bridge] = useState<boolean>(false)
  const [tryL2Bridge, setTryL2Bridge] = useState<boolean>(false)
  const [l2Allocation, setL2Allocation] = useState<number>(0)
  const [errorMessageL1Bridge, setErrorMessageL1Bridge] = useState<string>()
  const [errorMessageL2Bridge, setErrorMessageL2Bridge] = useState<string>()



  useEffect(() => {
    const fetchData = async () => {
      const [l1Capital, totalCapital] = await Promise.all([
        fetchL2Allocation(),
        fetchTvl()
      ]);

      const l2_allocation = l1Capital / totalCapital
      setL2Allocation(l2_allocation * 100);
    };

    fetchData();

  }, []);


  async function handleL2Bridge() {

    setTryL2Bridge(true)

    if (l2Allocation >= 5) {
      setErrorMessageL2Bridge("Bridging threshold not reach")
      return
    }

    if (!connection) {
      setErrorMessageL2Bridge("Connect Wallet Fist")
      return
    }

    const call_bridge: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "handle_bridge_from_l2",
      calldata: []
    }

    await connection.account.execute(
      [call_bridge]
    ).then(
      () => {
        setTryL2Bridge(false)
      }
    )
      .catch((error) => {
        console.log(error)
        setErrorMessageL2Bridge("error performing call")
        setTryL2Bridge(false)
      })
  }

  async function handleL1Bridge() {

    setTryL1Bridge(true)

    if (l2Allocation <= 15) {
      setErrorMessageL1Bridge("Bridging threshold not reach")
      return
    }

    if (!connection) {
      setErrorMessageL1Bridge("Connect Wallet Fist")
      return
    }

    const call_bridge: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "handle_bridge_from_l1",
      calldata: []
    }

    await connection.account.execute(
      [call_bridge]
    ).then(
      () => {
        setTryL1Bridge(false)
      }
    )
      .catch((error) => {
        console.log(error)
        setErrorMessageL1Bridge("error performing call")
        setTryL1Bridge(false)
      })
  }

  return (
    <Container>
      <div className="header">
        <div />
        <span>Yearn Ethereum</span>
        <span>yvWETH</span>
      </div>
      <span className="subtitle">Participate in Capital Rebalancing and earn Money Stream</span>
      <div className="equilibrate">
        <FlexColStates>
          <div className="repartition">
            <span>L2 Capital Allocation</span>
            <div>
              <div />
              <div style={{ width: `${l2Allocation}%` }} />
            </div>
            <span className="value" style={{ marginLeft: `calc(${l2Allocation}% - 10%)` }}>{`${l2Allocation.toPrecision(2)}%`}</span>
          </div>
          <FlexRow>
            <FlexCol>
              <LightText>
                Ideal Allocation
              </LightText>
              <BigText>
                10%
              </BigText>
            </FlexCol>
            <FlexCol>
              <LightText>
                L1 Bridge Limit
              </LightText>
              <BigText>
                5%
              </BigText>
            </FlexCol>
            <FlexCol>
              <LightText>
                L2 Bridge Limit
              </LightText>
              <BigText>
                15%
              </BigText>
            </FlexCol>

          </FlexRow>
        </FlexColStates>

        <div className="btn">
          <span>Equilibrate the pool allocation by bridging funds!</span>
          <button onClick={handleL2Bridge}>L2 Bridge</button>
          <div>
            {errorMessageL2Bridge}
          </div>
          <button onClick={handleL1Bridge}>Bridge</button>
          <div>
            {errorMessageL1Bridge}

          </div>
        </div>

      </div>
      <span className="subtitle">Submit a proof</span>
      <div className="proof">
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
        <div className="btn">
          <span>The actual proof is no more up to date, you can submit a new one and be rewarded.</span>
          <button>Proove</button>
        </div>
      </div>
    </Container>
  );
};

export default PoolTabProof;
