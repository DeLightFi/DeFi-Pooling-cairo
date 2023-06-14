import React, { useState } from "react";
import moment from "moment";
import { Tx, TxInfos, TxDetails, TxContainer } from "./TxElements";
import TxMenu from "./txMenu";
import { YieldEvents } from "../../../utils/yieldApi";
import { getStarkscanLink, shortenAddress } from "../../../utils";


interface TxComponentProps {
  tokens: any; // Replace with appropriate type
  lasttx: any; // Replace with appropriate type
  defiEvents: YieldEvents[];
}

const TxComponent: React.FC<TxComponentProps> = ({ tokens, lasttx, defiEvents }) => {
  const [selectedTxMenu, setSelectedTxMenu] = useState('Swap');
  console.log(defiEvents)

  return (
    <>
      <TxMenu selectedTxMenu={selectedTxMenu} setSelectedTxMenu={setSelectedTxMenu} />
      {
        selectedTxMenu == "State" ?
          <TxContainer>
            {
              lasttx.slice(0, 9).map(function (tx, key) {
                var token = tokens.find(({ address }) => address === tx.token);
                return (
                  <Tx key={key}>
                    <img src={`https://starkendefi.xyz/tokens/${token.symbol}.png`} />
                    <TxInfos>
                      <span>{token.name}</span>
                      {tx.diff < 0 ? <span>Increase</span> : <span>Decrease</span>}
                    </TxInfos>
                    <TxDetails>
                      <span>{tx.diff.toFixed(2)}</span>
                      <span>{moment(tx.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                    </TxDetails>
                  </Tx>
                )
              })
            }
          </TxContainer>
          :
          !defiEvents ?
            <div style={{ alignItems: "center", display: "flex", width: "100%", justifyContent: "center", marginTop: "20px" }}>
              <span>Loading...</span>

            </div>
            :
            selectedTxMenu == "Swap" ?
              <TxContainer>
                {
                  defiEvents.map(function (eventValue, key) {
                    if (eventValue.type !== "Swap") return (null)
                    return (
                      <Tx key={key}>
                        <img src={`http://localhost:3000/protocols/${eventValue.protocol}.png`} />
                        <TxInfos>
                          <span>{eventValue.description}</span>
                        </TxInfos>
                        <TxDetails>
                          <a href={getStarkscanLink(1, eventValue.hash, "transaction")} target="_blank">{shortenAddress(eventValue.hash, 2)}</a>
                          <span>{moment(eventValue.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                        </TxDetails>
                      </Tx>
                    )
                  })
                }
              </TxContainer>
              :
              selectedTxMenu == "Deposit" ?
                <TxContainer>
                  {
                    defiEvents.map(function (eventValue, key) {
                      if (eventValue.type !== "Deposit") return (null)
                      return (
                        <Tx key={key}>
                          <img src={`http://localhost:3000/protocols/${eventValue.protocol}.png`} />
                          <TxInfos>
                            <span>{eventValue.description}</span>
                          </TxInfos>
                          <TxDetails>
                            <a href={getStarkscanLink(1, eventValue.hash, "transaction")} target="_blank">{shortenAddress(eventValue.hash, 2)}</a>
                            <span>{moment(eventValue.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                          </TxDetails>
                        </Tx>
                      )
                    })
                  }
                </TxContainer>
                :
                selectedTxMenu == "Withdraw" ?
                  <TxContainer>
                    {
                      defiEvents.map(function (eventValue, key) {
                        if (eventValue.type !== "Withdraw") return (null)
                        return (
                          <Tx key={key}>
                            <img src={`http://localhost:3000/protocols/${eventValue.protocol}.png`} />
                            <TxInfos>
                              <span>{eventValue.description}</span>
                            </TxInfos>
                            <TxDetails>
                              <a href={getStarkscanLink(1, eventValue.hash, "transaction")} target="_blank">{shortenAddress(eventValue.hash, 2)}</a>
                              <span>{moment(eventValue.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                            </TxDetails>
                          </Tx>
                        )
                      })
                    }
                  </TxContainer>
                  :
                  selectedTxMenu == "Approval" ?
                    <TxContainer>
                      {
                        defiEvents.map(function (eventValue, key) {
                          if (eventValue.type !== "Approval") return (null)
                          return (
                            <Tx key={key}>
                              <img src={`http://localhost:3000/tokens/${eventValue.hash}.png`} />
                              <TxInfos>
                                <span>{eventValue.description}</span>
                              </TxInfos>
                              <TxDetails>
                                <a href={getStarkscanLink(1, eventValue.additional, "contract")} target="_blank"> to: {shortenAddress(eventValue.additional, 1)}</a>
                                <span>{moment(eventValue.timestamp).format('YYYY-MM-DD HH:mm:ss')}</span>
                              </TxDetails>
                            </Tx>
                          )
                        })
                      }
                    </TxContainer>
                    :
                    <TxContainer></TxContainer>
      }
    </>
  );
};

export default TxComponent;
