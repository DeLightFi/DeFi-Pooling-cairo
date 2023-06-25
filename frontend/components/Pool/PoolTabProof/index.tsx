import { useEffect, useState } from "react";
import { Call } from "starknet";
import styled from "styled-components";
import { BOOSTED_ETH, fetchApiData, fetchApiPostData, fetchCalldata, fetchL1Balance, fetchL1Bridged, fetchL1Received, fetchL2Allocation, fetchTaskStatusHerodotus, fetchTotalRewards, fetchTvl } from "../../../utils";
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


interface DataToUpdate {
  y_balance: number;
  l1_received: number;
  l1_bridged: number;
}

const PoolTabProof = ({ connection, setConnection }) => {
  const [tryL1Bridge, setTryL1Bridge] = useState<boolean>(false)
  const [tryL2Bridge, setTryL2Bridge] = useState<boolean>(false)
  const [isProofReady, setIsProofReady] = useState<boolean>(false)
  const [tryTriggerProof, setTryTriggerProof] = useState<boolean>(false)


  const [l2Allocation, setL2Allocation] = useState<number>(0)
  const [errorMessageL1Bridge, setErrorMessageL1Bridge] = useState<string>()
  const [errorProove, setErrorProove] = useState<string>()

  const [errorMessageL2Bridge, setErrorMessageL2Bridge] = useState<string>()
  const [l2Data, setL2Data] = useState<DataToUpdate>()
  const [l1Data, setL1Data] = useState<DataToUpdate>()
  const [proofBlockNumber, setProofBlockNumber] = useState(() => {
    const storedValue = localStorage.getItem('proof_blocknumber');
    return storedValue ? parseInt(storedValue, 10) : 0; // Default to 0 if no value was stored
  });


  useEffect(() => {
    const fetchData = async () => {
      const [l2Capital, totalCapital] = await Promise.all([
        fetchL2Allocation(),
        fetchTvl()
      ]);

      const l2_allocation = l2Capital / totalCapital
      setL2Allocation(l2_allocation * 100);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const [isSubmitted] = await Promise.all([
        fetchTaskStatusHerodotus(proofBlockNumber),
      ]);
      setIsProofReady(isSubmitted)

    };

    if (proofBlockNumber !== 0) {
      fetchData();
    }
  }, [proofBlockNumber]);


  useEffect(() => {
    const fetchData = async () => {
      const [l1Received, l1Bridged, l1Balance, apiResponse] = await Promise.all([
        fetchL1Received(),
        fetchL1Bridged(),
        fetchL1Balance(),
        fetchApiData()
      ]);

      setL2Data({
        y_balance: l1Balance,
        l1_received: l1Received,
        l1_bridged: l1Bridged
      })
      console.log(apiResponse)

      setL1Data({
        y_balance: parseFloat(apiResponse.balancedProofValue),
        l1_received: parseFloat(apiResponse.receivedProofValue),
        l1_bridged: parseFloat(apiResponse.bridgedProofValue)
      })


    };

    fetchData();

  }, []);


  async function handleL2Bridge() {

    setTryL2Bridge(true)

    if (!connection) {
      setErrorMessageL2Bridge("Connect Wallet Fist")
      return
    }

    if (l2Allocation < 15) {
      setErrorMessageL2Bridge("Bridging threshold not reach")
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




  async function handleSubmitProofHero() {
    const responsePostHerodotus = await fetchApiPostData()
    console.log(responsePostHerodotus.proof_blocknumber)
    localStorage.setItem('proof_blocknumber', responsePostHerodotus.proof_blocknumber.toString());
    setProofBlockNumber(responsePostHerodotus.proof_blocknumber)
  }


  async function handleTriggerProof() {

    setTryTriggerProof(true)
    if (!connection) {
      setErrorProove("Connect Wallet Fist")
      return
    }

    const callData = await fetchCalldata(proofBlockNumber);

    const fullCalldata = [proofBlockNumber].concat([callData.yearnBalance]).concat(
      [callData.callDataBridgedProof.proof_sizes_bytes.length()]
    ).concat(
      callData.callDataBridgedProof.proof_sizes_bytes
    ).concat(
      [callData.callDataBridgedProof.proof_sizes_words.length()]
    ).concat(
      callData.callDataBridgedProof.proof_sizes_words
    ).concat(
      [callData.callDataBridgedProof.proofs_concat.length()]
    ).concat(
      callData.callDataBridgedProof.proofs_concat
    ).concat(
      [callData.callDataReceivedProof.proof_sizes_bytes.length()]
    ).concat(
      callData.callDataReceivedProof.proof_sizes_bytes
    ).concat(
      [callData.callDataReceivedProof.proof_sizes_words.length()]
    ).concat(
      callData.callDataReceivedProof.proof_sizes_words
    ).concat(
      [callData.callDataReceivedProof.proofs_concat.length()]
    ).concat(
      callData.callDataReceivedProof.proofs_concat
    )
    const call_trigger_proof: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "submit_all_proof",
      calldata: fullCalldata
    }

    await connection.account.execute(
      [call_trigger_proof]
    ).then(
      () => {
        setTryTriggerProof(true)
        localStorage.removeItem('proof_blocknumber');
        setErrorProove(null)

      }
    )
      .catch((error) => {
        console.log(error)
        setErrorProove("error performing call")
        setTryTriggerProof(true)
      })
  }


  async function handleL1Bridge() {

    setTryL1Bridge(true)

    if (l2Allocation <= 5) {
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
          <button onClick={handleL1Bridge}>L1 Bridge</button>
          <div>
            {errorMessageL1Bridge}

          </div>
        </div>

      </div>
      <span className="subtitle">Participate in Providing L1 Data to L2 and earn Money Stream</span>
      <div className="proof">
        <div className="figures">
          <div>
            <span>Layer 1 (ETH)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>{l1Data ? l1Data.l1_received / 1000000000000000000 : "0.00"}</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>{l1Data ? l1Data.l1_bridged / 1000000000000000000 : "0.00"}</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>{l1Data ? l1Data.y_balance / 1000000000000000000 : "0.00"}</span>
              </div>
            </div>
          </div>
          <div>
            <span>Layer 2 (Starknet)</span>
            <div>
              <div>
                <span>Received ETH L1</span>
                <span>{l2Data ? l2Data.l1_received : "0.00"}</span>
              </div>
              <div>
                <span>Sent From L1</span>
                <span>{l2Data ? l2Data.l1_bridged : "0.00"}</span>
              </div>
              <div>
                <span>Vault Balance L1</span>
                <span>{l2Data ? l2Data.y_balance : "0.00"}</span>
              </div>
            </div>
          </div>
        </div>
        {
          l2Data && l1Data &&
            l2Data.l1_received == (l1Data.l1_received / 1000000000000000000) && l2Data.l1_bridged == (l1Data.l1_bridged / 1000000000000000000) && l2Data.y_balance == (l1Data.y_balance / 1000000000000000000) ?
            <div className="btn">
              <span>The actual proof is up to date, No need to submit new one</span>
            </div>
            :
            proofBlockNumber == 0 ?
              <div className="btn">
                <span>L1 and L2 data are different, post a proof, wait for it to be available on L2 and get trigger update on l2 to get rewarded</span>
                <button onClick={handleSubmitProofHero}>Proove</button>
              </div>
              :
              isProofReady ?
                <div className="btn">
                  <span>Proof is available on L2, you can now handle the update and get rewarded</span>
                  {
                    tryTriggerProof == false ?
                      <button onClick={handleTriggerProof}>Trigger Update</button>
                      :
                      <button >Loading....</button>

                  }
                  <button onClick={handleTriggerProof}>Trigger Update</button>
                  {
                    errorProove &&
                    <span>{errorProove}</span>
                  }
                </div>
                :
                <div className="btn">
                  <span>Waiting for proof to be available on l2, blockNumber: {proofBlockNumber}</span>
                </div>
        }
      </div>
    </Container>
  );
};

export default PoolTabProof;
