import React from "react";
import moment from "moment";
import { Container, TokensGrid, Token } from "./CustomTooltipElements";
import { formatNumber } from "../../../../utils";

const CustomTooltip = ({ tokens, payload, type, selectedDisplayMode }) => {
  if (payload && payload.length) {
    const selected_data = payload[0].payload;
    /* setRepartitiondata(selected_data); */

    let data_to_display = {
      timestamp: selected_data.timestamp,
      total: 0,
    };

    tokens.forEach((token, i) => {
      data_to_display[token.unique_id] = `${type === ""
        ? formatNumber(+selected_data[`balance_${token.unique_id}`])
        : formatNumber(+selected_data[`balance_usd_${token.unique_id}`])
        }${type === "" ? "" : "$"
        }`;
      data_to_display[`${token.unique_id}_balance`] = +selected_data[`balance_${token.unique_id}`]
      data_to_display.total += +selected_data[`balance_usd_${token.unique_id}`];
    });
    data_to_display[`portfolio_cost_USD`] = +selected_data[`portfolio_cost_USD`]
    data_to_display[`natif_USD`] = +selected_data[`natif_USD`]
    data_to_display[`defi_USD`] = +selected_data[`defi_USD`]
    data_to_display[`nft_USD`] = +selected_data[`nft_USD`]

    data_to_display[`jediswap`] = +selected_data[`jediswap`]
    data_to_display[`kswap`] = +selected_data[`kswap`]
    data_to_display[`sithswap`] = +selected_data[`sithswap`]
    if (selectedDisplayMode == "Protocol") {
      data_to_display.total = +selected_data[`portfolio_cost_USD_protocol`];
    }





    return (
      <Container>
        <span>
          {moment(new Date(+data_to_display.timestamp)).format(
            "DD MMMM YYYY h:mm"
          )}
        </span>
        {
          selectedDisplayMode == "Classic" ?
            <></>
            :
            selectedDisplayMode == "Type" ?
              <>
                <span style={{ color: "#fd9432", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {`Native tokens: $${formatNumber(+data_to_display[`natif_USD`])}`}
                </span>
                <span style={{ color: "#2cc0fe", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {`DeFi holdings: $${formatNumber(+data_to_display[`defi_USD`])}`}
                </span>
                <span style={{ color: "#e51bfc", fontWeight: 600, whiteSpace: "nowrap" }}>
                  {`NFTs holdings: $${formatNumber(selected_data[`nft_USD`])}`}
                </span>
              </>
              :
              selectedDisplayMode == "Protocol" ?
                <TokensGrid>

                  {
                    data_to_display[`jediswap`] !== 0 &&
                    <Token>
                      <img src={`http://localhost:3000/tokens/JEDI-protocol.png`} />
                      <span style={{ color: "#2cc0fe", fontWeight: 600, whiteSpace: "nowrap" }}>
                        $ {formatNumber(data_to_display[`jediswap`])}
                      </span>
                    </Token>
                  }
                  {
                    data_to_display[`kswap`] !== 0 &&
                    <Token>
                      <img src={`http://localhost:3000/tokens/10K-protocol.png`} />
                      <span style={{ color: "#e51bfc", fontWeight: 600, whiteSpace: "nowrap" }}>
                        $ {formatNumber(data_to_display[`kswap`])}
                      </span>
                    </Token>
                  }
                  {
                    data_to_display[`sithswap`] !== 0 &&
                    <Token>
                      <img src={`http://localhost:3000/tokens/SITH-protocol.png`} />
                      <span style={{ color: "#fffb00", fontWeight: 600, whiteSpace: "nowrap" }}>
                        $ {formatNumber(data_to_display[`sithswap`])}
                      </span>
                    </Token>
                  }


                </TokensGrid>
                :
                <TokensGrid>
                  {tokens.map(function (token, i) {
                    if (data_to_display[`${token.unique_id}_balance`] === 0) return null
                    return (
                      <Token>
                        <img src={`https://starkendefi.xyz/tokens/${token.symbol}.png`} />
                        <span style={{ color: token.color, fontWeight: 600 }}>
                          {(data_to_display[token.unique_id])}
                        </span>
                      </Token>
                    );
                  })}
                </TokensGrid>
        }

        <span>

          {`TVL: $${formatNumber(+data_to_display.total)}`}
        </span>
        <span>
          {selectedDisplayMode == "Protocol"
            ? `Return: ${formatNumber(
              +data_to_display.total.toFixed(2) -
              +selected_data["cumulated_cost_USD_protocol"]
            )}$`
            : `Return: ${formatNumber(
              +data_to_display.total.toFixed(2) -
              +selected_data["cumulated_cost_USD"]
            )}$`}
        </span>
      </Container>
    );
  }

  return null;
};

export default CustomTooltip;
