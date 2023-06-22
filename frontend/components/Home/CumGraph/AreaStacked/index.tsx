import React, { useEffect, useState } from "react";
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

const availableColor = ["#DC29FF", "#2AC2FE", "6d87fe"]


const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * availableColor.length);
  return availableColor[randomIndex];
};


const AnalyticsCumGraph = ({ data, wallets, theme }) => {

  const [stopColors, setStopColors] = useState([]);

  useEffect(() => {
    const colors = wallets.map(() => getRandomColor());
    setStopColors(colors);
  }, [wallets]);

  return (
    <ResponsiveContainer>
      <ComposedChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <defs>
          {stopColors.map((color, i) => (
            <linearGradient id={`color_${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.6} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
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
              stackId="1"
              stroke={wallet.color}
              strokeWidth={1}
              fill={`url(#color_${i})`}
              fillOpacity="1"
            />
          );
        })}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsCumGraph;
