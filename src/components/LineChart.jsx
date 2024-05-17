import {
  ResponsiveContainer,
  LineChart as LineChartFromLib,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  Line,
} from "recharts";
import Element from "./Element";
import { get } from "lodash";

const CustomTooltip = ({ cardType, active, label, payload, target }) => {
  if (active && payload && payload.length) {
    return (
      <Element border="1px solid" backgroundColor="white" padding="4px">
        <Element type="p" fontWeight="bold" fontSize="12px">
          {label}
        </Element>
        <Element display="flex" alignItems="center">
          <Element
            width="6px"
            height="6px"
            backgroundColor="green"
            marginRight="4px"
          />
          <Element type="p" fontSize="12px">
            {cardType === "FR" && "CSAT Rating:"}
            {cardType === "RE" && "Review Effectiveness (%):"}
            {cardType === "DRE" && "DRE (%):"}
            {cardType === "FTR" &&
              "Requirements Delivered First Time Right (%):"}
            {cardType === "DR" && "Before Risk Treatment:"}
          </Element>
          &nbsp;
          <Element type="p" fontSize="12px" fontWeight="bold">
            {get(payload, "0.value")}
          </Element>
        </Element>
        {cardType == "DR" && (
          <Element display="flex" alignItems="center">
            <Element
              width="6px"
              height="6px"
              backgroundColor="blue"
              marginRight="4px"
            />
            <Element type="p" fontSize="12px">
              After Risk Treatment:
            </Element>
            &nbsp;
            <Element type="p" fontSize="12px" fontWeight="bold">
              {get(payload, "0.value")}
            </Element>
          </Element>
        )}
        <Element display="flex" alignItems="center">
          <Element
            width="6px"
            height="6px"
            backgroundColor="red"
            marginRight="4px"
          />
          <Element type="p" fontSize="12px">
            Target:
          </Element>
          &nbsp;
          <Element type="p" fontSize="12px" fontWeight="bold">
            {target}
          </Element>
        </Element>
      </Element>
    );
  }

  return null;
};

const LineChart = ({
  data,
  title,
  xAxisKey,
  dataKey,
  dataKey2,
  xAxisLabel,
  yAxisLabel,
  target,
  ticks,
  cardType,
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
          <LineChartFromLib data={data}>
            <CartesianGrid strokeDasharray="0" vertical={false} opacity={0.4} />
            <XAxis
              dataKey={xAxisKey}
              axisLine={true}
              padding={{ left: 50, right: 50 }}
              tick={{ fontSize: 12, fill: "black" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickCount={6}
              domain={[0, "dataMax"]}
              ticks={ticks}
              interval={0}
            />
            <Tooltip
              content={<CustomTooltip cardType={cardType} target={target} />}
            />
            <ReferenceLine y={target} stroke="red" strokeWidth={2} />
            {cardType === "DR" && (
              <Line
                connectNulls
                dataKey={dataKey2}
                stroke="blue"
                fill="blue"
                strokeWidth={2}
              />
            )}
            <Line
              connectNulls
              dataKey={dataKey}
              stroke="green"
              fill="green"
              strokeWidth={2}
            />
            
          </LineChartFromLib>
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

export default LineChart;
