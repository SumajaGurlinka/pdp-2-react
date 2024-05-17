import {
  ResponsiveContainer,
  BarChart as BarChartFromLib,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Bar,
  LabelList,
} from "recharts";
import Element from "./Element";
import { find, get, map } from "lodash";

const CustomTooltip = ({ active, label, payload, dataKeys }) => {
  if (active && payload && payload.length) {
    return (
      <Element border="1px solid" backgroundColor="white" padding="4px">
        <Element type="p" fontWeight="bold" fontSize="12px">
          {label}
        </Element>
        {map(payload, (data) => {
          const obj = find(dataKeys, ["key", data.dataKey]);
          return (
            <Element display="flex" alignItems="center">
              <Element
                width="6px"
                height="6px"
                backgroundColor={data.color}
                marginRight="4px"
              />
              <Element type="p" fontSize="12px">
                {obj.label}:
              </Element>
              &nbsp;
              <Element type="p" fontSize="12px" fontWeight="bold">
                {get(data, "value")}
              </Element>
            </Element>
          );
        })}
      </Element>
    );
  }

  return null;
};

const BarChart = ({
  data,
  title,
  xAxisKey,
  dataKeys,
  xAxisLabel,
  yAxisLabel,
  ticks,
}) => {
  return (
    <>
      <Element
        type="p"
        textAlign="center"
        fontWeight="bold"
        fontSize="16px"
        marginBottom="8px"
      >
        {title}
      </Element>
      <Element position="relative">
        <ResponsiveContainer height={200}>
          <BarChartFromLib data={data}>
            <CartesianGrid strokeDasharray="0" vertical={false} opacity={0.4} />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tick={{ fontSize: 10, fill: "black" }}
              minTickGap={2}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={6}
              domain={[0, "dataMax"]}
              ticks={ticks}
              interval={0}
            />
            <Tooltip content={<CustomTooltip dataKeys={dataKeys} />} />
            {map(dataKeys, (data) => (
              <Bar dataKey={data.key} fill={data.color}>
                <LabelList
                  dataKey={data.key}
                  position="top"
                  fill={data.color}
                  offset={1}
                />
              </Bar>
            ))}
          </BarChartFromLib>
        </ResponsiveContainer>
        <Element
          type="p"
          position="absolute"
          fontSize="12px"
          fontStyle="italic"
          transform="rotate(-90deg)"
          transformOrigin={0}
          bottom="60px"
          left="18px"
        >
          {yAxisLabel}
        </Element>
        <Element
          type="p"
          textAlign="center"
          paddingLeft="50px"
          marginTop="-8px"
          fontStyle="italic"
          fontSize="12px"
        >
          {xAxisLabel}
        </Element>
      </Element>
    </>
  );
};

export default BarChart;
