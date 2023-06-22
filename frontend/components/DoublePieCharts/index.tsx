import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer, Label } from 'recharts';

const COLORS = ['#DC29FF', '#2AC2FE', '#04ff00', '#c40000', '#FFBB28', '#0008ff'];
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 2.5;
  const sin = Math.sin(-midAngle * Math.PI / 180);
  const cos = Math.cos(-midAngle * Math.PI / 180);
  const x = cx + radius * cos;
  const y = cy + radius * sin;
  if (percent < 0.02) return (null)
  return (
    <text x={x} y={y} fill={COLORS[index % COLORS.length]} textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={"9px"}>
      <tspan x={x} >{name} : {`${(percent * 100).toFixed(0)}% `}</tspan>
    </text>

  );
};





const DoublePieCharts = ({ data }) => (
  <div style={{ display: 'flex', height: '200px', width: '100%' }}>
    <div style={{ width: '50%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data.tokenAllocation}
            cx="50%"
            cy="50%"
            outerRadius={60}
            labelLine={false}

            innerRadius={50}
            label={renderCustomizedLabel}
          >
            {data.tokenAllocation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>

    <div style={{ width: '50%' }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data.typeInfoAllocation}
            cx="50%"
            cy="50%"
            outerRadius={60}
            innerRadius={50}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.typeInfoAllocation.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          {/* <Tooltip /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default DoublePieCharts;
