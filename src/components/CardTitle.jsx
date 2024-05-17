import Element from "./Element";
import {
  LineChartOutlined,
  TableOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const CardTitle = ({ card, showCharts, setShowCharts }) => {
  let ChartIcon = null;
  if (card.charts && !showCharts[card.key]) {
    ChartIcon = card.chartType === "bar" ? BarChartOutlined : LineChartOutlined;
  }
  return (
    <Element display="flex" justifyContent="space-between" alignItems="center">
      <p>{card.label}</p>
      {ChartIcon && (
        <ChartIcon
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => setShowCharts({ ...showCharts, [card.key]: true })}
        />
      )}
      {showCharts[card.key] && (
        <TableOutlined
          style={{
            fontSize: "24px",
            cursor: "pointer",
          }}
          onClick={() => setShowCharts({ ...showCharts, [card.key]: false })}
        />
      )}
    </Element>
  );
};

export default CardTitle;
