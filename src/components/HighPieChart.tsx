import Highcharts, { Options, SeriesPieOptions } from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface HighNestedPieChartProps {
  data: {
    name: string;
    unlocked: number;
    locked: number;
    color: string;
  }[];
  hoveredSegment: string | null;
}

const HighNestedPieChart = ({
  data,
  hoveredSegment,
}: HighNestedPieChartProps) => {
  const chartData: SeriesPieOptions["data"] = data.map((item) => ({
    name: item.name,
    y: item.unlocked + item.locked,
    color: item.color,
    opacity: hoveredSegment && hoveredSegment !== item.name ? 0.5 : 1, 
    sliced: hoveredSegment === item.name, 
     selected: hoveredSegment === item.name,
     
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
      useHTML: true,
      formatter: function () {
        const segment = data.find((item) => item.name === this.name);
        return `
          <div style="font-size: 13px; color: #333; font-weight: bold;">
            Allocation: <span style="color: #0073E6">${this.name}</span>
          </div>
          ${
            segment?.locked
              ? `<div style="color: #707070; font-size: 12px;">
            Locked: <b>${segment.locked}%</b> for Supply
          </div>`
              : ""
          }
          ${
            segment?.unlocked
              ? `<div style="color: #333; font-size: 12px;">
            Unlocked: <b>${segment.unlocked}%</b> for Supply
          </div>`
              : ""
          }
          <div style="color: #000; font-size: 12px; font-weight: bold;">
            Total: <b>${this.y}%</b> for Supply
          </div>
        `;
      },
    },
    plotOptions: {
      pie: {
        borderColor: "transparent",
        dataLabels: {
          enabled: true,
          format: "<b>{point.y}%</b>",
          style: {
            fontSize: "14px",
            fontWeight: "bold",
            textOutline: "none",
            color: "#fff",
          },
          distance: -40,
        },
        states: {
          hover: {
            brightness: 0.1, // Làm sáng khi hover
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
