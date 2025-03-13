import Highcharts, { Options } from "highcharts";
import HighchartsReact from "highcharts-react-official";

const HighNestedPieChart = () => {
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
      pointFormat: "<b>{point.y}%</b>",
      backgroundColor: "#fff",
      borderColor: "#ddd",
      borderRadius: 8,
      style: { fontSize: "13px", color: "#333" },
    },
    plotOptions: {
      pie: {
        shadow: {
          color: "rgba(0, 0, 0, 0.1)", // Hiệu ứng bóng nhẹ
          offsetX: 2,
          offsetY: 2,
          opacity: 0.5,
          width: 5,
        },
        dataLabels: {
          enabled: true,
          format: "{point.name}: <b>{point.y}%</b>",
          style: { fontSize: "12px", fontWeight: "bold", textOutline: "none" },
        },
        states: {
          inactive: {
            opacity: 0.6, // 🔥 Ngăn Highcharts làm mờ các phần khác khi hover
          },
        },
      },
    },
    credits: { enabled: false },
    series: [
      // Vòng ngoài (Segment lớn)
      {
        type: "pie",
        name: "Category",
        size: "100%",
        borderWidth: 0,
        innerSize: "62%", // Tạo khoảng trống để chứa vòng trong
        // dataLabels: { enabled: false }, // Ẩn label cho vòng ngoài
        dataLabels: {
          enabled: true,
          // format: "{point.name}%",
          // distance: -20, // Đưa label gần hơn
          style: {
            fontSize: "11px",
            fontWeight: "bold",
            color: "#fff",
            textOutline: "none",
          },
        },
        data: [
          { name: "Community", y: 40, color: "#3F4A66" },
          { name: "Ecosystem & Growth", y: 20, color: "#0073E6" },
          { name: "Orbiter Foundation", y: 15, color: "#7D6BD5" },
          { name: "Team & Contributors", y: 15, color: "#7EC4F5" },
          { name: "Investors", y: 10, color: "#A0DFC2" },
        ],
      },
      // Vòng trong (Unlocked & Locked)
      {
        type: "pie",
        name: "Token Allocation",
        size: "62%",
        borderColor: "#fff",
        innerSize: "40%",
        dataLabels: {
          enabled: true,
          format: "{point.y}%",
          distance: -30, // Đưa label gần hơn
          style: {
            fontSize: "11px",
            fontWeight: "bold",
            color: "#fff",
            textOutline: "none",
          },
        },
        data: [
          { name: "Community (Unlocked)", y: 25, color: "#3F4A66" },
          {
            name: "Community (Locked)",
            y: 15,
            color: "#707A91",
            dataLabels: { enabled: false },
          },
          { name: "Ecosystem (Unlocked)", y: 2.5, color: "#0073E6" },
          {
            name: "Ecosystem (Locked)",
            y: 17.5,
            color: "#005BB5",
            dataLabels: { enabled: false },
          },
          {
            name: "Orbiter (Unlocked)",
            y: 4,
            color: "#7D6BD5",
            dataLabels: { enabled: false },
          },
          { name: "Orbiter (Locked)", y: 11, color: "#A59AC8" },
          { name: "Team & Contributors", y: 15, color: "#7EC4F5" },
          { name: "Investors", y: 10, color: "#A0DFC2" },
        ],
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default HighNestedPieChart;
