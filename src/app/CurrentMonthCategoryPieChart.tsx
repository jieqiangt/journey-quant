"use client";

import { ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { PieChartProps } from "@/models/charts.model";
import { Fragment } from "react";

const renderLabel = (props: any) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, fill, payload, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 10;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <Fragment>
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 8}
        y={ey}
        textAnchor={textAnchor}
        dy={3}
        fill="#333"
      >
        {`${payload.label}: $${value}`}
      </text>
    </Fragment>
  );
};

const CurrentMonthCategoryPieChart: React.FC<PieChartProps> = (props) => {
  const { classes, baseClass, data } = props;
  const outerRadius = 140;
  return (
    <div className={classes[baseClass]}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={true}
            label={renderLabel}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey="total"
          >
            {data.map((dataRow) => (
              <Cell key={`${dataRow.label}`} fill={dataRow.color as string} />
            ))}
          </Pie>
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            payload={data.map((dataRow) => ({
              value: dataRow.label,
              type: "circle",
              color: dataRow.color,
            }))}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentMonthCategoryPieChart;
