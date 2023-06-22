import React from "react";
import moment from "moment";
import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "../CustomTooltip";

const AnalyticsGraph = ({ tokens, aggregated_data, type, theme, selectedDisplayMode }) => {
  return (
    <ResponsiveContainer >
      <ComposedChart
        data={aggregated_data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id={`color_basic0`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={"#e51bfc"} stopOpacity={0.6} />
            <stop offset="100%" stopColor={"#e51bfc"} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`color_basic1`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={"#2cc0fe"} stopOpacity={0.6} />
            <stop offset="100%" stopColor={"#2cc0fe"} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`color_basic2`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={"#fd9432"} stopOpacity={0.6} />
            <stop offset="100%" stopColor={"#fd9432"} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={`color_basic3`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={"#fffb00"} stopOpacity={0.6} />
            <stop offset="100%" stopColor={"#fffb00"} stopOpacity={0} />
          </linearGradient>

          {tokens.map(function (token, i) {
            return (
              <linearGradient id={`color_${token.unique_id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={token.color} stopOpacity={0.6} />
                <stop offset="100%" stopColor={token.color} stopOpacity={0} />
              </linearGradient>
            )
          })}
        </defs>
        <XAxis
          scale="time"
          dataKey="timestamp"
          axisLine={false}
          tickLine={false}
          tickFormatter={(ts) => moment(new Date(+ts)).format("DD MMMM YYYY")}
          tick={false}
        />
        <Tooltip
          content={<CustomTooltip tokens={tokens} payload={aggregated_data} type={type} selectedDisplayMode={selectedDisplayMode} />}
          cursor={false}
        />
        {
          selectedDisplayMode == "Classic" ?
            <Area
              type="monotone"
              dataKey={`portfolio_cost_USD`}
              stroke={"#e51bfc"}
              strokeWidth={1}
              fill={`url(#color_basic0)`}
              fillOpacity="1"
            /> :
            selectedDisplayMode == "Type" ?
              <>
                <Area
                  type="monotone"
                  dataKey={`natif_USD`}
                  stackId="1"
                  stroke={"#fd9432"}
                  strokeWidth={1}
                  fill={`url(#color_basic2)`}
                  fillOpacity="1"
                />
                <Area
                  type="monotone"
                  dataKey={`defi_USD`}
                  stroke={"#2cc0fe"}
                  strokeWidth={1}
                  stackId="1"

                  fill={`url(#color_basic1)`}
                  fillOpacity="1"
                />
                <Area
                  type="monotone"
                  dataKey={`nft_USD`}
                  stroke={"#e51bfc"}
                  stackId="1"
                  strokeWidth={1}
                  fill={`url(#color_basic0)`}
                  fillOpacity="1"
                />


              </>
              :

              selectedDisplayMode == "Protocol" ?
                <>
                  {/* <Area
                    type="monotone"
                    dataKey={`otherThanProtocol`}
                    stackId="1"
                    stroke={"#fd9432"}
                    strokeWidth={1}
                    fill={`url(#color_basic2)`}
                    fillOpacity="1"
                  /> */}
                  <Area
                    type="monotone"
                    dataKey={`jediswap`}
                    stroke={"#2cc0fe"}
                    strokeWidth={1}
                    stackId="1"

                    fill={`url(#color_basic1)`}
                    fillOpacity="1"
                  />
                  <Area
                    type="monotone"
                    dataKey={`kswap`}
                    stroke={"#e51bfc"}
                    stackId="1"
                    strokeWidth={1}
                    fill={`url(#color_basic0)`}
                    fillOpacity="1"
                  />
                  <Area
                    type="monotone"
                    dataKey={`sithswap`}
                    stroke={"#fffb00"}
                    stackId="1"
                    strokeWidth={1}
                    fill={`url(#color_basic3)`}
                    fillOpacity="1"
                  />
                </>
                :
                tokens.map(function (token, i) {
                  return (
                    <Area
                      type="monotone"
                      dataKey={`balance${type}_${token.unique_id}`}
                      stackId="1"
                      stroke={token.color}
                      strokeWidth={1}
                      fill={`url(#color_${token.unique_id})`}
                      fillOpacity="1"
                    />
                  );
                })}
        {selectedDisplayMode !== "Protocol" ? (
          <Line
            type="monotone"
            dataKey="cumulated_cost_USD"
            stroke={theme.name === 'light' ? "#4C4C66" : "#dddadb"}
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        ) : (
          <Line
            type="monotone"
            dataKey="cumulated_cost_USD_protocol"
            stroke={theme.name === 'light' ? "#4C4C66" : "#dddadb"}
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsGraph;
