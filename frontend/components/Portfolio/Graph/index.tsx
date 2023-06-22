import { useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import TokenTable from "../TokenTable";

import AnalyticsGraph from "./AreaStacked";
import { Container, DataRow, Selector, ButtonGroup, AbsoluteFilter, ChartContainer } from "./GraphElements";
import Header from "./Header";
import TokensSelector from "./TokensSelector";

const Graph = ({ f_tokens, tokens, filters, setFilters, f_data, data, daterange, SetDaterange, theme, selectedDisplayMode, setSelectedDisplayMode }) => {
  const type = "_usd";
  const available_daterange = ["1D", "1W", "1M", "3M", "ALL"];
  let selected_data = f_data[`data_${daterange}`];
  const [selectedButton, setSelectedButton] = useState("Chart")

  return (
    <>
      <Header tokens={f_tokens} selected_data={selected_data} selectedButton={selectedButton} setSelectedButton={setSelectedButton} />
      {
        selectedButton == "Chart" ?
          <Container>
            <DataRow>
              <Selector>
                <ButtonGroup style={{ zIndex: 3 }}>
                  {available_daterange.map((dr) => {
                    return (
                      <button
                        onClick={(e) => SetDaterange(dr)}
                        className={daterange == dr ? "focused" : ""}
                      >{dr}
                      </button>
                    )
                  })}
                </ButtonGroup>
                <TokensSelector tokens={tokens} filters={filters} setFilters={setFilters} selectedDisplayMode={selectedDisplayMode} setSelectedDisplayMode={setSelectedDisplayMode} />
              </Selector>
            </DataRow>
            <AnalyticsGraph tokens={f_tokens} aggregated_data={selected_data} type={type} theme={theme} selectedDisplayMode={selectedDisplayMode} />
          </Container>
          :
          <TokenTable tokens={tokens} data={data} daterange={"1D"} />
      }

    </>
  );
};

export default Graph;
