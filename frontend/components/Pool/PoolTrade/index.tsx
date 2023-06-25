import { useEffect, useState } from "react";
import styled from "styled-components";
import { BOOSTED_ETH, ETH, fetchEthBalance, fetchEthBoostedBalance, fetchShareRatio, formatNumber, getCgTokenPrice } from "../../../utils";
import LogoNameEth from "./LogoNameEth";
import { BiArrowFromTop } from 'react-icons/bi'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { Container } from "./PoolTradeElements";
import { connect, ConnectedStarknetWindowObject } from '@argent/get-starknet'
import LogoNameEthBoost from "./LogoNameEthBoost";
import { Call } from "starknet";

const UnderlyingList = styled.div`
  display: flex;
  flex-direction: column; 
  gap: 2px;
  align-items: center;
  width: 100%;
`


const UnderlyingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 10px;
  background-color: #000000;
  border-radius: 10px;

`

const UnderlyingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5px;
  gap: 5px;
  min-height: 25px;
`
const StyledOutput = styled.div`
  font-size: 16px; // Increase the font size
  font-weight: bold; // Make the font bold
  padding-inline: 5px;
  padding-block: 5px;
  color: white;
  text-align: right;
  white-space: nowrap;
`


const StyledInput = styled.input`
  max-width: 40%;
  font-size: 16px; // Increase the font size
  font-weight: bold; // Make the font bold
  padding-inline: 5px;
  padding-block: 5px;
  color: white;
  outline: none;
  border: none; // Remove the border
  text-align: right;
  background-color: #161616;
  border-radius: 2px;

  // Add the following styles to hide spinner arrows for number inputs
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  // For Firefox
  &[type='number'] {
    -moz-appearance: textfield;
  }
`

const BalanceAndButton = styled.div`
  display: flex;
  flex-flow: row;
  gap: 5px;
  align-items: center;
`

const LightText = styled.div`
  font-weight: light;
  color: #f5f5f58b;
  font-size: small;
`

const ErrorMessage = styled.div`
  font-weight: light;
  color: #0000008a;
  font-size: small;
`

const MaxButton = styled.button`
  background-color:#e6e452;
  margin-left: 8px;
  color: black;
  font-size: 13px;
  padding: 4px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px #e6e452;
  }
`


interface PoolTradeProps {
  connection: ConnectedStarknetWindowObject;
  setConnection: (connection: ConnectedStarknetWindowObject) => void;
}

const PoolTrade = ({ connection, setConnection }: PoolTradeProps) => {
  const [mode, setMode] = useState("deposit");
  const [depositInputValue, setDepositInputValue] = useState<string>("0")
  const [redeemInputValue, setRedeemInputValue] = useState<string>("0")

  const [depositOutputValue, setDepositOutputValue] = useState<string>("0")
  const [redeemOutputValue, setRedeemOutputValue] = useState<string>("0")

  const [ethToSharesRatio, setEthToSharesRatio] = useState<number>(1)
  const [userEthBalance, setUserEthBalance] = useState<number>(0)
  const [userYieldBalance, setUserYieldBalance] = useState<number>(0)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [errorMessageDeposit, setErrorMessageDeposit] = useState<string>("")
  const [errorMessageRedeem, setErrorMessageRedeem] = useState<string>("")

  const [tryDeposit, setTryDeposit] = useState<boolean>(false)
  const [tryRedeem, setTryRedeem] = useState<boolean>(false)



  // const updateUserInfoAndSetDerivative = async () => {
  //   if (connection.account.address) {
  //     await derivative.fetchUserBalances(connectedAddress)
  //   } else {
  //     derivative.setUserBalancesNul()
  //   }
  //   const new_derivative = derivative.copy()
  //   setDerivative(new_derivative)
  // }



  useEffect(() => {
    const fetchData = async () => {
      const eth_price_ = await getCgTokenPrice();
      const ratio = await fetchShareRatio();
      setEthPrice(eth_price_)
      setEthToSharesRatio(ratio)
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchBalances = async () => {
      const eth_balance = await fetchEthBalance(connection.account.address);
      const boosted_eth_balance = await fetchEthBoostedBalance(connection.account.address);
      setUserEthBalance(eth_balance)
      setUserYieldBalance(boosted_eth_balance)
    };

    if (connection) {
      fetchBalances()
    }
  }, [connection])


  const handleAmountChangeDepositValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    if (!event.target.value || parseFloat(event.target.value) < 0) {
      setDepositInputValue('0')
      setDepositOutputValue('0')
    } else {
      // Don't round the value while the user is typing
      const newValue = event.target.value
      if (parseFloat(newValue) == 0) {
        setDepositInputValue(newValue)
        setDepositOutputValue('0')
      } else {
        setDepositInputValue(newValue)
        setDepositOutputValue((parseFloat(newValue) * ethToSharesRatio).toString())
      }
    }
  }


  const handleAmountChangeRedeemValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {

    if (!event.target.value || parseFloat(event.target.value) < 0) {
      setRedeemInputValue('0')
      setRedeemOutputValue('0')
    } else {
      // Don't round the value while the user is typing
      const newValue = event.target.value
      if (parseFloat(newValue) == 0) {
        setRedeemInputValue(newValue)
        setRedeemOutputValue('0')
      } else {
        setRedeemInputValue(newValue)
        setRedeemOutputValue((parseFloat(newValue) / ethToSharesRatio).toString())
      }
    }
  }


  const handleMaxUnderlyings = () => {
    setDepositInputValue((userEthBalance / 1000000000000000000).toString())
    setDepositOutputValue((userEthBalance * ethToSharesRatio / 1000000000000000000).toString())
  }


  const handleMaxBoostedUnderlyings = () => {
    setRedeemInputValue((userYieldBalance / 1000000000000000000).toString())
    setRedeemOutputValue(((userYieldBalance / ethToSharesRatio) / 1000000000000000000).toString())
  }

  async function handleDeposit() {

    setTryDeposit(true)

    if (parseFloat(depositInputValue) == 0) {
      setErrorMessageDeposit("Invalid Amount")
      return
    }

    if (!connection) {
      setErrorMessageDeposit("Connect Wallet Fist")
      return
    }

    const call_approve: Call = {
      contractAddress: ETH,
      entrypoint: "approve",
      calldata: [BOOSTED_ETH, (parseFloat(depositInputValue) * 1000000000000000000), 0]
    }

    const call_deposit: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "deposit",
      calldata: [(parseFloat(depositInputValue) * 1000000000000000000), 0, connection.account.address]
    }

    await connection.account.execute(
      [call_approve, call_deposit]
    ).then(
      () => {
        setTryDeposit(false)
      }
    )
      .catch((error) => {
        console.log(error)
        setErrorMessageDeposit("error performing call")
        setTryDeposit(false)
      })
  }


  async function handleRedeem() {

    setTryRedeem(true)



    if (!connection) {
      setErrorMessageRedeem("Connect Wallet Fist")
      return
    }

    if (parseFloat(redeemInputValue) == 0 || parseFloat(redeemInputValue) * 1000000000000000000 > userYieldBalance) {
      setErrorMessageRedeem("Invalid Amount")
      return
    }

    console.log("started")

    const call_approve: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "approve",
      calldata: [BOOSTED_ETH, (parseFloat(redeemInputValue) * 1000000000000000000), 0]
    }

    const call_redeem: Call = {
      contractAddress: BOOSTED_ETH,
      entrypoint: "redeem",
      calldata: [(parseFloat(redeemInputValue) * 1000000000000000000), 0, connection.account.address, connection.account.address]
    }

    await connection.account.execute(
      [call_approve, call_redeem]
    ).then(
      () => {
        setTryRedeem(false)
      }
    )
      .catch((error) => {
        console.log(error)
        setErrorMessageRedeem("error performing call")
        setTryRedeem(false)
      })
  }




  return (
    <Container>
      <span className="title">Instant L1 Share Trade  </span>
      <div className="trade">
        {mode === "deposit" ?
          <div className="btn selected" onClick={() => setMode('deposit')}>
            <div>
              <FaArrowDown />
            </div>
            <span>Deposit</span>
          </div>
          :
          <div className="btn" onClick={() => setMode('deposit')}>
            <span className="unselected">Deposit</span>
          </div>
        }
        {mode === "reedem" ?
          <div className="btn selected" onClick={() => setMode('reedem')}>
            <span>Reedem</span>
            <div>
              <FaArrowUp />
            </div>
          </div>
          :
          <div className="btn" onClick={() => setMode('reedem')}>
            <span className="unselected">Reedem</span>
          </div>
        }
      </div>
      {
        mode === "deposit" ?
          <>
            <UnderlyingList>
              <UnderlyingBox >
                <UnderlyingRow>
                  <LogoNameEth />
                  <StyledInput
                    type="number"
                    value={
                      depositInputValue
                        ? depositInputValue
                        : '0'
                    }
                    onChange={(event) =>
                      handleAmountChangeDepositValue(event)
                    }
                  />
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>
                        Balance:{' '}
                        {formatNumber(
                          userEthBalance / 1000000000000000000
                        )}
                      </>
                    </LightText>
                    <MaxButton
                      onClick={() => handleMaxUnderlyings()}
                    >
                      Max
                    </MaxButton>
                  </BalanceAndButton>

                  <LightText>
                    <>
                      {formatNumber(parseFloat(depositInputValue) * ethPrice)
                      }{' '}
                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
              <BiArrowFromTop size={'25px'} color={'black'} />
              <UnderlyingBox >
                <UnderlyingRow>
                  <LogoNameEthBoost />
                  <StyledOutput>
                    {formatNumber(parseFloat(depositOutputValue))}
                  </StyledOutput>
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>Balance: {formatNumber(userYieldBalance / 1000000000000000000)}</>
                    </LightText>
                  </BalanceAndButton>
                  <LightText>
                    <>
                      {formatNumber(ethPrice * parseFloat(depositOutputValue))}{' '}
                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
            </UnderlyingList>
            <ErrorMessage>
              {errorMessageDeposit}
            </ErrorMessage>
            {
              tryDeposit == false ?
                <div className="submit" onClick={handleDeposit}>
                  <button>Deposit</button>
                </div>
                :
                <div className="submit" >
                  <button>Loading ...</button>
                </div>
            }

          </>
          :
          <>
            <UnderlyingList>
              <UnderlyingBox >
                <UnderlyingRow>
                  <LogoNameEthBoost />
                  <StyledInput
                    type="number"
                    value={
                      redeemInputValue
                        ? redeemInputValue
                        : '0'
                    }
                    onChange={(event) =>
                      handleAmountChangeRedeemValue(event)
                    }
                  />
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>
                        Balance:{' '}
                        {formatNumber(userYieldBalance / 1000000000000000000)}
                      </>
                    </LightText>
                    <MaxButton
                      onClick={() => handleMaxBoostedUnderlyings()}
                    >
                      Max
                    </MaxButton>
                  </BalanceAndButton>

                  <LightText>
                    <>
                      {formatNumber(parseFloat(redeemInputValue) * ethPrice)}{' '}
                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
              <BiArrowFromTop size={'25px'} color={'black'} />
              <UnderlyingBox >
                <UnderlyingRow>
                  <LogoNameEth />
                  <StyledOutput>
                    {formatNumber(parseFloat(redeemOutputValue))}
                  </StyledOutput>
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>Balance: {formatNumber(userEthBalance / 1000000000000000000)}</>
                    </LightText>
                  </BalanceAndButton>
                  <LightText>
                    <>
                      {formatNumber(parseFloat(redeemOutputValue) * ethPrice)}{' '}

                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
            </UnderlyingList>
            <ErrorMessage>
              {errorMessageRedeem}
            </ErrorMessage>
            {
              tryRedeem == false ?
                <div className="submit" onClick={handleRedeem}>
                  <button>Redeem</button>
                </div>
                :
                <>
                  <div className="submit">
                    <button>Loading..</button>
                  </div>
                </>

            }

          </>
      }
    </Container>
  );
};

export default PoolTrade;
