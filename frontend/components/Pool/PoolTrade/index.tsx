import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import styled from "styled-components";
import { formatNumber, getCgTokenPrice } from "../../../utils";
import LogoNameEth from "./LogoNameEth";
import { BiArrowFromTop } from 'react-icons/bi'
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

import { Container } from "./PoolTradeElements";
import { connect, ConnectedStarknetWindowObject } from '@argent/get-starknet'
import LogoNameEthBoost from "./LogoNameEthBoost";

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

interface PoolProps {
  connection: ConnectedStarknetWindowObject;
  setConnection: React.Dispatch<React.SetStateAction<ConnectedStarknetWindowObject>>;
}

const PoolTrade = ({ connection, setConnection }: PoolProps) => {
  const [mode, setMode] = useState("deposit");
  const [depositInputValue, setDepositInputValue] = useState<string>("0")
  const [depositOutputValue, setDepositOutputValue] = useState<string>("0")
  const [ethToSharesRatio, setEthToSharesRatio] = useState<number>(1)
  const [userEthBalance, setUserEthBalance] = useState<number>(0)
  const [userYieldBalance, setUserYieldBalance] = useState<number>(0)
  const [ethPrice, setEthPrice] = useState<number>(0)



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
      setEthPrice(eth_price_)
    };

    fetchData();
  }, []);

  useEffect(() => {

    if (connection) {
      console.log(connection.account.address)
      console.log("connected shishhh")
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


  const handleMaxUnderlyings = () => {
    setDepositInputValue("0")
  }



  return (
    <Container>
      <span className="title">Access top L1 yields</span>
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
                          0
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
                      {depositInputValue
                        ? depositInputValue
                        : '0'}{' '}
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
                    {parseFloat(depositOutputValue) == 0
                      ? formatNumber(parseFloat(depositOutputValue))
                      : '0'}
                  </StyledOutput>
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>Balance: {formatNumber(userYieldBalance)}</>
                    </LightText>
                  </BalanceAndButton>
                  <LightText>
                    <>
                      {depositOutputValue
                        ? depositOutputValue
                        : '0'}{' '}
                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
            </UnderlyingList>
            <div className="submit">
              <button>Submit</button>
            </div>
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
                          userYieldBalance
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
                      {depositInputValue
                        ? depositInputValue
                        : '0'}{' '}
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
                    {parseFloat(depositOutputValue) == 0
                      ? formatNumber(parseFloat(depositOutputValue))
                      : '0'}
                  </StyledOutput>
                </UnderlyingRow>
                <UnderlyingRow>
                  <BalanceAndButton>
                    <LightText>
                      <>Balance: {formatNumber(userEthBalance)}</>
                    </LightText>
                  </BalanceAndButton>
                  <LightText>
                    <>
                      {depositOutputValue
                        ? depositOutputValue
                        : '0'}{' '}
                      $
                    </>
                  </LightText>
                </UnderlyingRow>
              </UnderlyingBox>
            </UnderlyingList>
            <div className="submit">
              <button>Submit</button>
            </div>
          </>
      }
    </Container>
  );
};

export default PoolTrade;
