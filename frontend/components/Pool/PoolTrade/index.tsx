import { useEffect, useState } from "react";
import { FaLock } from "react-icons/fa";
import styled from "styled-components";
import { formatNumber } from "../../../utils";
import LogoNameEth from "./LogoNameEth";

import { Container } from "./PoolTradeElements";
import { connect, ConnectedStarknetWindowObject } from '@argent/get-starknet'


const UnderlyingBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  padding: 5px;
  background-color: #161616;
  border-left: solid 2px;
  border-radius: 2px;
  border-color: red;
`

const UnderlyingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-inline: 5px;
  gap: 5px;
  min-height: 25px;
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
  background-color:black;
  margin-left: 8px;
  color: white;
  font-size: 13px;
  padding: 4px;
  border-radius: 2px;
  border: none;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px black;
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
    console.log(connection.account.address)
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
              <FaLock />
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
              <FaLock />
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
            <div className="submit">
              <button>Submit</button>
            </div>
          </>
          :
          <>
          </>
      }
    </Container>
  );
};

export default PoolTrade;
