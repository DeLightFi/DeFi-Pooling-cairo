import { useEffect, useState } from "react";
import { Title2, MainSection, GraphSection, TxSection, SelectWallet } from "../components/AppElements";
import Header from "../components/Portfolio/Header";
import IntroDash from "../components/IntroDash";
import { useConnectors, useAccount } from '@starknet-react/core'
import styled, { keyframes } from "styled-components";
import { shortenAddress } from "../utils";
import router, { useRouter } from 'next/router';


const ConnectorButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  margin: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: 2px solid transparent;
  transition: all 0.3s ease-in-out;
  background-color: ${({ theme }) => theme.colors.bg2};
  border-color: ${({ theme }) => theme.colors.bg1};

  &:hover {
    border-color: ${({ theme }) => theme.colors.color1};
    background-color: ${({ theme }) => theme.colors.bg2};
  }
  img {
    width: 40px;
    height: 40px;
  }
  span {
    margin-top: 10px;
    color: ${({ theme }) => theme.colors.color1};
  }
`;
const CoolDisplay = styled.div`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.bg2};
    color: ${({ theme }) => theme.colors.color1};

    transition: all 0.3s ease;
    width: 550px;
`;

const CoolInput = styled.input`
    display: flex;
    align-items: center;
    border: none;
    border-radius: 5px;
    padding: 10px;
    background-color: ${({ theme }) => theme.colors.bg2};
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.colors.color1};

    width: 550px;
`;



const DisconnectButton = styled.button`
  display: flex;
  padding: 15px;
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.color1};
  background-color: ${({ theme }) => theme.colors.bg2};
  border: none;
`;

const ConnectorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-flow: column;
  gap: 4em;

`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  gap: 2em;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProviderFlex = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.4em;
`;

const Title = styled.div`
  color: ${({ theme }) => theme.colors.color1};
  font-size: 2.8em;
  text-align: center;
  font-weight: bold;
`;



const TitleProvider = styled.div`
  color: ${({ theme }) => theme.colors.color1};
  font-size: 1.4em;
  font-weight: normal;
`;


const FlexColErrorMessage = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.5em;
  width: 100%;
`;

const ErrorMessage = styled.div`
  color: red;
  font-weight: 300;
`;

const FlexRowAddress = styled.div`
  display: flex;
  flex-flow: row;
  gap: 1em;
  font-weight: normal;
  width: 100%;
`;



export default function ConnectWallet({ theme, SetTheme }) {
  const [data, setData] = useState({ data: [] });
  const { connect, connectors, disconnect } = useConnectors()
  const { account, address, status } = useAccount()
  const [newWalletaddressManual, setNewWalletaddressManual] = useState("");
  const [allowedAddress, setAllowedAddress] = useState(true);
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");

  // read storage on first render
  useEffect(() => {
    disconnect()
    const stored = localStorage.getItem("wallets");
    if (stored !== 'undefined' && stored !== null) {
      setData({ data: JSON.parse(stored) });
    }
  }, []);




  const AddOneInput = () => {
    const is_valid = checkAddress(newWalletaddressManual)

    let copied = [...data.data];
    if (is_valid == false) {
      setErrorMessage2("Address invalid")
      return
    }
    for (let index = 0; index < copied.length; index++) {
      const element = copied[index].address;
      if (newWalletaddressManual == element) {
        setErrorMessage2("Address already connected")
        return
      }
    }
    const newwallet = {
      address: newWalletaddressManual,
    };
    copied.push(newwallet);
    setData({ data: copied });
    localStorage.setItem("wallets", JSON.stringify(copied));
    router.push(`/dashboard/${newWalletaddressManual}`);
    return;
  }

  const AddOne = (e) => {
    const is_valid = checkAddress(e)
    if (is_valid == false) {
      setErrorMessage1("Address invalid")
      return
    }
    let copied = [...data.data];
    for (let index = 0; index < copied.length; index++) {
      const element = copied[index].address;
      if (e == element) {
        setErrorMessage1("Address already connected")
        return
      }
    }
    const newwallet = {
      address: e,
    };
    copied.push(newwallet);
    setData({ data: copied });
    localStorage.setItem("wallets", JSON.stringify(copied));
    router.push(`/dashboard/${e}`);
    return;
  }


  const checkAddress = (address) => {
    const startsWith0x = address.startsWith("0x");
    if (startsWith0x) {
      const hasMinLength = address.length >= 13;
      return (hasMinLength)
    } else {
      const endsWithStark = address.endsWith(".stark");
      if (endsWithStark) {
        return (true)

      } else {
        return (false)
      }
    }
    // Check if input ends with ".stark"


  }

  return (
    <Container>
      <ConnectorContainer>
        <Title>
          Connect to Starken
        </Title>

        <ProviderFlex>
          <TitleProvider>
            Track your wallets
          </TitleProvider>

          <FlexRow>
            {
              status == "disconnected" ?
                connectors &&
                connectors.map((connector) => (
                  <div key={connector.id()}>
                    <ConnectorButton onClick={() => connect(connector)}>
                      <img src={connector.id() == "braavos" ? "/img/Braavos.svg" : "/img/argentx.png"} alt={connector.id()} />
                      <span>{connector.id()}</span>
                    </ConnectorButton>
                  </div>
                ))
                :
                <FlexColErrorMessage>
                  <FlexRowAddress>
                    <CoolDisplay>{address}</CoolDisplay>
                    {allowedAddress == true ?
                      <DisconnectButton onClick={() => AddOne(address)}>
                        Add Wallet
                      </DisconnectButton>
                      :
                      <DisconnectButton onClick={() => disconnect()}>
                        Disconnect
                      </DisconnectButton>
                    }

                  </FlexRowAddress>
                  <ErrorMessage>
                    {errorMessage1}
                  </ErrorMessage>
                </FlexColErrorMessage>


            }
          </FlexRow>
        </ProviderFlex>
        <ProviderFlex>
          <TitleProvider>
            Track any wallet
          </TitleProvider>
          <FlexColErrorMessage>
            <FlexRowAddress>
              <CoolInput
                type="text"
                required
                placeholder="Starknet Address (0x or starknetId)"
                name="address"
                onChange={(event) => setNewWalletaddressManual(event.target.value)}
              />
              <DisconnectButton onClick={() => AddOneInput()}>
                Add Wallet
              </DisconnectButton>
            </FlexRowAddress>
            <ErrorMessage>
              {errorMessage2}
            </ErrorMessage>
          </FlexColErrorMessage>

        </ProviderFlex>
      </ConnectorContainer>
    </Container>
  );
}