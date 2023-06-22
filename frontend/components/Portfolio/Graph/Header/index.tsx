import { useState } from "react";
import { Title, Pricefilters, Price, Container, FlexCol1, FlexCol2, FlexRow } from "./HeaderElements";
import Filters from "../Filters";
import { Compute } from "./compute";
import FiltersMenu from "../FiltersMenu";
import { formatNumber } from "../../../../utils";

const Header = ({ tokens, selected_data, selectedButton, setSelectedButton }) => {
  const [mode, SetMode] = useState("TVL")

  const { tvl, pnl } = Compute(tokens, selected_data)


  return (
    <Container>
      <FlexRow>
        <Filters mode={mode} SetMode={SetMode} />

        {
          mode == "TVL" ?
            <FlexCol1>
              <Title>Total Value Locked</Title>
              <span>{formatNumber(tvl.last)} $</span>
            </FlexCol1>
            :
            <FlexCol1>
              <Title>Prodit and Loss</Title>
              <span>{formatNumber(pnl.last)} $</span>
            </FlexCol1>

        }
        {

          mode == "TVL" ?
            tvl.first != 0 &&
            <FlexCol2>
              <Title>Evolution</Title>
              <span
                style={{
                  color: tvl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                }}
              >
                {formatNumber(tvl.last - tvl.first)} $
              </span>
              <span
                style={{
                  color: tvl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                }}
              >
                ({tvl.evo}%)
              </span>
            </FlexCol2>
            :
            pnl.first != 0 &&
            <FlexCol2>
              <Title>Evolution</Title>
              <span
                style={{
                  color: pnl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                }}>
                ${formatNumber(pnl.last - pnl.first)}

              </span>
              <span
                style={{
                  color: pnl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                }}>
                ({pnl.evo}%)

              </span>
            </FlexCol2>

        }
        {/* 
          <Pricefilters>
            <Price>
              {mode === "TVL" ? (
                <>
                  <span>{formatNumber(tvl.last)} $</span>
                  {tvl.first != 0 ? (
                    <span
                      style={{
                        color: tvl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                      }}
                    >
                      {formatNumber(tvl.last - tvl.first)} $ ({tvl.evo}%)
                    </span>
                  ) : (
                    <></>
                  )}
                </>)
                :
                <>
                  <span>{formatNumber(pnl.last)} $</span>
                  {
                    pnl.first != 0 &&
                    <span
                      style={{
                        color: pnl.evo[0] === "-" ? "#ff3300" : "#a9c035",
                      }}>
                      ${formatNumber(pnl.last - pnl.first)} ({pnl.evo}%)

                    </span>
                  }

                </>
              }
            </Price>
          </Pricefilters> */}
      </FlexRow>
      <FiltersMenu
        selectedButton={selectedButton}
        setSelectedButton={setSelectedButton}
      />

    </Container>
  );
};

export default Header;
