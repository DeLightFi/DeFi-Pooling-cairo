import React from "react";
import moment from "moment";
import { Container, TokensGrid, Token } from "./CustomTooltipElements";

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
                <div style={{ background: wallet.color }} />
                <div>
                  <span>
                    {selected_data[`ad${i + 1}`].toFixed(2)}$
                  </span>
                  <span>{wallet.address.slice(0, 6)}...{wallet.address.slice(wallet.address.length - 4, wallet.address.length)}</span>
                </div>
              </Token>
            );
          })}
        </TokensGrid>
      </Container>
    );
  }

  return null;
};

export default CustomTooltip;
