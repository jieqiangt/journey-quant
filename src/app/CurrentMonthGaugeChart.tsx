"use client";

import {
  ResponsiveContainer,
  Sector,
  Cell,
  PieChart,
  Pie,
  Legend,
} from "recharts";
import { GaugeChartProps } from "@/models/charts.model";
import { Fragment, useState } from "react";

const renderInnerActiveShape = (props: any) => {
  const {
    cx,
    cy,
    fill,
    payload,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    value,
  } = props;
  return (
    <Fragment>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <text x={cx} y={cy} dy={-6} textAnchor="middle" fill={fill}>
        {payload.label}
      </text>
      <text x={cx} y={cy} dy={12} textAnchor="middle" fill={fill}>
        {value}
      </text>
    </Fragment>
  );
};

const renderOuterActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <Fragment>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={3} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`$${value} (${(percent * 100).toFixed(2)}%)`}</text>
    </Fragment>
  );
};

const CurrentMonthGaugeChart: React.FC<GaugeChartProps> = (props) => {
  const { data, outerData, total, classes, baseClass } = props;
  const [innerActiveIndex, setInnerActiveIndex] = useState<number | undefined>(
    undefined
  );
  const [outerActiveIndex, setOuterActiveIndex] = useState<number | undefined>(
    undefined
  );

  const onInnerPieEnter = (event: any) => {
    setInnerActiveIndex(() => +event.name);
    if (event.label == "Remaining") {
      setOuterActiveIndex(() => 2);
    }
  };

  const onInnerPieLeave = () => {
    setInnerActiveIndex(() => undefined);
    setOuterActiveIndex(() => undefined);
  };

  const onOuterPieEnter = (event: any) => {
    setOuterActiveIndex(() => +event.name);
    if (event.label == "Remaining") {
      setInnerActiveIndex(() => 1);
    }
  };

  const onOuterPieLeave = () => {
    setOuterActiveIndex(() => undefined);
    setInnerActiveIndex(() => undefined);
  };

  const xPosition = "50%";
  const yPosition = "50%";
  const startAngle = -220;
  const endAngle = 40;
  const innerPieOuterRadius = 140;
  const innerPieInnerRadius = innerPieOuterRadius - 40;
  const outerPieOuterRadius = innerPieOuterRadius + 30;
  const outerPieInnerRadius = innerPieOuterRadius + 10;
  
  return (
    <div className={classes[baseClass]}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey={"total"}
            cx={xPosition}
            cy={yPosition}
            startAngle={startAngle}
            endAngle={endAngle}
            outerRadius={innerPieOuterRadius}
            innerRadius={innerPieInnerRadius}
            activeShape={renderInnerActiveShape}
            onMouseEnter={onInnerPieEnter}
            onMouseLeave={onInnerPieLeave}
            activeIndex={innerActiveIndex}
          >
            {data.map((dataRow, idx) => (
              <Cell key={`${idx}`} fill={dataRow.color as string} />
            ))}
          </Pie>
          <Pie
            data={outerData}
            dataKey="total"
            cx={xPosition}
            cy={yPosition}
            startAngle={startAngle}
            endAngle={endAngle}
            innerRadius={outerPieInnerRadius}
            outerRadius={outerPieOuterRadius}
            activeShape={renderOuterActiveShape}
            onMouseEnter={onOuterPieEnter}
            onMouseLeave={onOuterPieLeave}
            activeIndex={outerActiveIndex}
          >
            {outerData.map((dataRow, idx) => (
              <Cell key={`${idx}`} fill={dataRow.color as string} />
            ))}
          </Pie>
          {innerActiveIndex == undefined ? (
            <Fragment>
              <text x={xPosition} y={yPosition} dy={-6-16} textAnchor="middle">
                Total Expenditure
              </text>
              <text x={xPosition} y={yPosition} dy={12-16} textAnchor="middle">
                {total}
              </text>
            </Fragment>
          ) : (
            ""
          )}
          <Legend
            verticalAlign="bottom"
            iconType="circle"
            payload={outerData.map((dataRow) => ({
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

export default CurrentMonthGaugeChart;
