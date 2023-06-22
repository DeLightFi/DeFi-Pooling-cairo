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

const ActiveUsersGraph = ({ data, color }) => {
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={data}
        margin={{
          top: 15,
          right: 0,
          left: 0,
          bottom: -20,
        }}
      >
        <defs>
          <linearGradient id={`color_${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="30%" stopColor={color} stopOpacity={1} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          scale="time"
          dataKey="timestamp"
          axisLine={false}
          tickLine={false}
          tickFormatter={(ts) => moment(new Date(+ts)).format("DD MMMM YYYY")}
          tick={false}
        />
        <Area
          type="monotone"
          dataKey={`balance_usd`}
          stackId="1"
          stroke={color}
          strokeWidth={1}
          fill={`url(#color_${color})`}
          fillOpacity="1"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ActiveUsersGraph;
