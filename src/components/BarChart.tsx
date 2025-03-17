import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const StackedBarChart = ({ totalLocked, totalUnlocked, lockedPercentage, unlockedPercentage }: { totalLocked: string, totalUnlocked: string, lockedPercentage: number, unlockedPercentage: number }) => {
  const chartOptions: Options = {
    chart: {
      type: "bar", 
      backgroundColor: "transparent",
      height: 90, // Điều chỉnh chiều cao phù hợp UI
    },
    title: { text: "" },
    xAxis: {
      categories: [""], // Chỉ có 1 hàng
      labels: { enabled: false }, // Ẩn nhãn trục X
      lineWidth: 0, // Ẩn đường kẻ
    },
    yAxis: {
      visible: false, // Ẩn luôn trục Y
      max: 100, // Tổng là 100%
    },
    tooltip: {
      pointFormat: "<b>{series.name}: {point.y}%</b>",
    },
    plotOptions: {
      series: {
        borderWidth: 0, // ✅ Loại bỏ border giữa các bar
        stacking: "normal",
        dataLabels: {
          enabled: true,
          format: "{point.y}%",
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#fff",
            textOutline: "none",
          },
        },
      },
      bar: {
        pointWidth: 15,
      },
    },
    legend: {
      align: "left",
      verticalAlign: "top",
      layout: "horizontal",
      reversed: true,
      itemStyle: {
        fontSize: "12px",
        fontWeight: "bold",
        color: "#fff",
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      {
        type: "bar",
        name: "Unlocked",
        data: [unlockedPercentage],
        color: "#A855F7", // Màu tím
      },
      {
        type: "bar",
        name: "Next Unlocked",
        data: [0],
        color: "#2DD4BF", // Màu xanh
      },
      {
        type: "bar",
        name: "Locked",
        data: [lockedPercentage],
        color: "#6B7280", // Màu xám
      },
    ],
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      <div className="flex justify-between">
        <p>BIC {totalLocked} ~ $39.78M</p>
        <p>BIC {totalUnlocked} ~ $72.46M</p>
      </div>
    </div>
  );
};

export default StackedBarChart;
