import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";
interface HighNestedPieChartProps {
  data: {
    name: string;
    unlocked: number;
    locked: number;
    color: string;
  }[];
}
const HighNestedPieChart = ({ data }: HighNestedPieChartProps) => {

  const chartData = data.map((item) => ({
    name: item.name,
    y: item.unlocked + item.locked, // Hiển thị tổng
    color: item.color,
  }));

  const chartOptions: Options = {
    chart: {
      type: "pie",
      backgroundColor: "transparent",
    },
    title: {
      text: "Allocation",
      align: "left",
      style: { display: "none" },
    },
    tooltip: {
      useHTML: true, // Cho phép HTML trong tooltip
      formatter: function () {
        const locked =
          data.find((item) => item.name === this.name)?.locked || 0;
        const unlocked =
          data.find((item) => item.name === this.name)?.unlocked || 0;
        return `
          <div style="font-size: 13px; color: #333; font-weight: bold;">
            Allocation: <span style="color: #0073E6">${this.name}</span>
          </div>
          ${
            locked > 0
              ? `<div style="color: #707070; font-size: 12px;">
            Locked: <b> ${locked}%</b>  for Supply
          </div>`
              : ""
          }
          ${
            unlocked > 0 &&
            ` <div style="color: #333; font-size: 12px;">
            Unlocked: <b>${unlocked}%</b> for Supply
          </div>`
          }
          <div style="color: #000; font-size: 12px; font-weight: bold;">
            Total: <b>${this.y}%</b> for Supply
          </div>
        `;
      },
    },
    plotOptions: {
      pie: {
        shadow: {
          color: "rgba(0, 0, 0, 0.1)",
          offsetX: 2,
          offsetY: 2,
          opacity: 0.5,
          width: 5,
        },
        dataLabels: {
          enabled: true,
          format: "<b>{point.y}%</b>",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            textOutline: "none",
            color: "#fff",
          },
          distance: -40, // Số nằm trên segment
        },
        states: {
          inactive: {
            opacity: 0.6,
          },
        },
      },
    },
    credits: { enabled: false },
    series: [
      {
        type: "pie",
        name: "Category",
        size: "100%",
        borderWidth: 0,
        innerSize: "60%",
        dataLabels: {
          enabled: true,
          style: {
            fontSize: "11px",
            fontWeight: "bold",
            color: "#fff",
            textOutline: "none",
          },
        },
        data: chartData,
      },
    ],
  };

  return (
    <div className="shrink-0">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default HighNestedPieChart;
