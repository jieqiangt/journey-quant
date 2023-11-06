"use client";

import { StackedBarProps } from "@/models/charts.model";
import { CATEGORYCOLORS } from "@/utils/constants";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const CurrentMonthDailyBarChart: React.FC<StackedBarProps> = (props) => {
  const { data, classes, baseClass } = props;

  return (
    <div className={classes[baseClass]}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {CATEGORYCOLORS.map((dataRow) => (
            <Bar
              key={dataRow.category}
              dataKey={dataRow.category}
              stackId="dailyExpenses"
              fill={dataRow.color}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CurrentMonthDailyBarChart;
