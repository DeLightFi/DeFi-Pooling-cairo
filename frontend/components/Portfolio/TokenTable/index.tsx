

import React, { useMemo, useState } from 'react';
import { formatNumber } from '../../../utils';
import DoublePieCharts from '../../DoublePieCharts';
import { Container, Title, TokenLine, TokenName, HoldingTypesContainer, ClickableType, LogoAndName, TypeUsdAndAllocation, TokensFlex, FlexRow, FlexCol, TokenLineInit, TokenNamePlace } from "./TokenTableElements";


const HoldingTypesContainerComponent = ({ tokens_types, type_info, handleToggleCat, openCats }) => {
  return (
    <HoldingTypesContainer>
      {Object.keys(tokens_types).map((cat, k1) => {
        if (type_info[cat].allocation <= 0.001) return (null)
        return (
          <>
            <ClickableType onClick={() => handleToggleCat(cat)}>
              <LogoAndName>
                <img src={`http://localhost:3000/protocols/${cat}.png`} />
                <span>
                  {cat}
                </span>
              </LogoAndName>

              <TypeUsdAndAllocation>
                <span>
                  $ {formatNumber(type_info[cat].usdValue)}
                </span>
                <span>
                  ({type_info[cat].allocation.toFixed(3)}%)
                </span>

              </TypeUsdAndAllocation>

            </ClickableType>
            <TokensFlex>

              {openCats[cat] && (
                <>
                  <TokenLineInit>
                    <TokenNamePlace>
                      <div >Token Name</div>
                    </TokenNamePlace>
                    <div>Price</div>
                    <div>Balance</div>
                    <div>Value</div>

                  </TokenLineInit>
                  {Object.keys(tokens_types[cat]).map(function (unique_id, k2) {
                    if (tokens_types[cat][unique_id].balance <= 0) return null;
                    return (

                      <TokenLine key={k2}>
                        <FlexRow>
                          <img src={`https://starkendefi.xyz/tokens/${tokens_types[cat][unique_id].symbol}.png`} />
                          <TokenName>
                            <span>{tokens_types[cat][unique_id].name}</span>
                            <span>{tokens_types[cat][unique_id].symbol}</span>
                          </TokenName>
                        </FlexRow>
                        <div>$ {formatNumber(tokens_types[cat][unique_id].price)}</div>
                        <div>{cat !== 'NFTs' ? formatNumber(tokens_types[cat][unique_id].balance) : Math.floor(+tokens_types[cat][unique_id].balance)}</div>
                        <FlexCol>
                          <div>
                            ${tokens_types[cat][unique_id].tvl.toFixed(2)}
                          </div>
                          <div style={{ color: tokens_types[cat][unique_id].tvl_evolution[0] === "-" ? "#ff3300" : "#a9c035" }}>({tokens_types[cat][unique_id].tvl_evolution[0] === "-" ? "" : "+"} {tokens_types[cat][unique_id].tvl_evolution}) 24H</div>
                        </FlexCol>
                      </TokenLine>
                    )
                  })}
                </>
              )}
            </TokensFlex>
          </>
        );
      })}
    </HoldingTypesContainer>
  );
};

const TokenTable = ({ tokens, data, daterange }) => {
  const [openCats, setOpenCats] = useState({});

  let total_usd = 0;
  tokens.forEach(function (token) {
    let balance_usd = +data[`data_${daterange}`][data[`data_${daterange}`].length - 1][`balance_usd_${token.unique_id}`];
    total_usd += balance_usd;
  });
  let total_usd_per_type = {}

  tokens.forEach(function (token) {
    let type = "Wallet"
    if (token.unique_id.toLowerCase().includes('jedi')) {
      type = 'Jediswap'
    } else if (token.unique_id.toLowerCase().includes('sith')) {
      type = 'Sithswap'
    } else if (token.unique_id.toLowerCase().includes('10k')) {
      type = '10kswap'
    }
    if (token.type === 'nft') {
      type = 'NFTs'
    }

    let balance_usd = +data[`data_${daterange}`][data[`data_${daterange}`].length - 1][`balance_usd_${token.unique_id}`];

    total_usd_per_type[type] = (total_usd_per_type[type] || 0) + balance_usd;
  });

  let type_info = {}
  for (let type in total_usd_per_type) {
    type_info[type] = type_info[type] || {};

    // allocation per type
    type_info[type]['allocation'] = (total_usd_per_type[type] / total_usd) * 100;

    // total USD value per type
    type_info[type]['usdValue'] = total_usd_per_type[type];
  }

  let tokens_types = {}
  tokens.forEach(function (token) {
    let first_tvl_dollars_total = data[`data_${daterange}`][0][`balance_usd_${token.unique_id}`];
    let last_tvl_dollars_total = data[`data_${daterange}`][data[`data_${daterange}`].length - 1][`balance_usd_${token.unique_id}`];

    // Ensure these variables have valid number values, if not assign them zero
    first_tvl_dollars_total = isNaN(first_tvl_dollars_total) ? 0 : first_tvl_dollars_total;
    last_tvl_dollars_total = isNaN(last_tvl_dollars_total) ? 0 : last_tvl_dollars_total;

    let tvl_evolution = (
      ((last_tvl_dollars_total - first_tvl_dollars_total) / first_tvl_dollars_total) * 100
    ).toFixed(2);

    let type = "Wallet"
    if (token.unique_id.toLowerCase().includes('jedi')) {
      type = 'Jediswap'
    } else if (token.unique_id.toLowerCase().includes('sith')) {
      type = 'Sithswap'
    } else if (token.unique_id.toLowerCase().includes('10k')) {
      type = '10kswap'
    }
    if (token.type === 'nft') {
      type = 'NFTs'
    }

    tokens_types[type] = tokens_types[type] || {}

    tokens_types[type][token.unique_id] = tokens_types[type][token.unique_id] || {}
    tokens_types[type][token.unique_id]['name'] = token.name;
    tokens_types[type][token.unique_id]['symbol'] = token.symbol;
    tokens_types[type][token.unique_id]['unique_id'] = token.unique_id;
    tokens_types[type][token.unique_id]['balance'] = +data[`data_${daterange}`][data[`data_${daterange}`].length - 1][`balance_${token.unique_id}`];
    tokens_types[type][token.unique_id]['price'] = +data[`data_${daterange}`][data[`data_${daterange}`].length - 1][`${token.unique_id}_to_USD`];
    tokens_types[type][token.unique_id]['protocolAllocation'] = (last_tvl_dollars_total / type_info[type].usdValue) * 100;
    tokens_types[type][token.unique_id]['totalAllocation'] = (last_tvl_dollars_total / total_usd) * 100;
    tokens_types[type][token.unique_id]['tvl'] = last_tvl_dollars_total;
    tokens_types[type][token.unique_id]['tvl_evolution'] = tvl_evolution;

  });

  const dataPie = useMemo(() => {
    const data = {
      tokenAllocation: [],
      typeInfoAllocation: [],
    };

    Object.keys(tokens_types).forEach((cat, k1) => {
      if (type_info[cat].allocation > 0.001) {
        data.typeInfoAllocation.push({
          name: cat,
          value: type_info[cat].usdValue,
        });

        Object.keys(tokens_types[cat]).forEach((unique_id, k2) => {
          if (tokens_types[cat][unique_id].tvl > 0.001) {
            data.tokenAllocation.push({
              name: tokens_types[cat][unique_id].symbol,
              value: tokens_types[cat][unique_id].tvl,
            });
          }
        });
      }
    });

    return data;
  }, [tokens_types, type_info]);




  const handleToggleCat = (cat) => {
    setOpenCats(prevOpenCats => ({
      ...prevOpenCats,
      [cat]: !prevOpenCats[cat]
    }));
  };

  return (
    <Container>
      <DoublePieCharts data={dataPie} />
      <HoldingTypesContainerComponent
        tokens_types={tokens_types}
        type_info={type_info}
        handleToggleCat={handleToggleCat}
        openCats={openCats}
      />
    </Container>
  );
};

export default TokenTable;
