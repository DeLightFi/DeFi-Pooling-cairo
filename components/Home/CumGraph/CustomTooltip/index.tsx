import React from "react";
import moment from "moment";
import { Container, TokensGrid, Token } from "./CustomTooltipElements";
import { shortenAddress } from "../../../../utils";

const CustomTooltip = ({ wallets, theme, payload }) => {
  if (payload && payload.length) {
    const selected_data = payload[0].payload;

    return (
      <Container>
        <span>
          {moment(new Date(+selected_data.timestamp)).format(
            "DD MMMM YYYY h:mm"
          )}
        </span>
        <TokensGrid>
          {wallets.map(function (wallet, i) {
            return (
              <Token>
                <span>
                  {selected_data[`ad${i + 1}`].toFixed(2)}$
                </span>
                <span>{wallet.address.includes(".stark") ? wallet.address : shortenAddress(wallet.address)}</span>
              </Token>
            );
          })}
        </TokensGrid>
        <span>
          TVL: ${+selected_data.total.toFixed(2)}
        </span>
      </Container>
    );
  }

  return null;
};

export default CustomTooltip;
