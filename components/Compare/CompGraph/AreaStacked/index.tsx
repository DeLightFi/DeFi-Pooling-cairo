import React from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  Line,
  XAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import CustomTooltip from "../CustomTooltip";

const AnalyticsCompGraph = ({ data, wallets, theme }) => {
  return (
    <ResponsiveContainer>
      <AreaChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          {wallets.map(function (wallet, i) {
            return (
              <linearGradient id={`color_${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={wallet.color} stopOpacity={0.6} />
                <stop offset="100%" stopColor={wallet.color} stopOpacity={0} />
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
          content={<CustomTooltip wallets={wallets} theme={theme} payload={data} />}
          cursor={false}
        />
        {wallets.map(function (wallet, i) {
          return (
            <Area
              type="monotone"
              dataKey={`ad${i + 1}`}
              stroke={wallet.color}
              strokeWidth={1}
              fill={`url(#color_${i})`}
              fillOpacity="1"
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsCompGraph;
