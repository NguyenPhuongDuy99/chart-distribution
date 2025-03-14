import Highcharts, { Options } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const HighNestedPieChart = () => {
  const mockData = [
    { name: 'Community', unlocked: 25, locked: 15, color: '#3F4A66' },
    {
      name: 'Ecosystem & Growth',
      unlocked: 2.5,
      locked: 17.5,
      color: '#0073E6',
    },
    { name: 'Orbiter Foundation', unlocked: 4, locked: 11, color: '#7D6BD5' },
    { name: 'Team & Contributors', unlocked: 15, locked: 0, color: '#7EC4F5' },
    { name: 'Investors', unlocked: 10, locked: 0, color: '#A0DFC2' },
  ];

  const chartData = mockData.map((item) => ({
    name: item.name,
    y: item.unlocked + item.locked, // Hiển thị tổng
    color: item.color,
  }));

  const chartOptions: Options = {
    chart: {
      type: 'pie',
      backgroundColor: 'transparent',
    },
    title: {
      text: 'Allocation',
      align: 'left',
      style: { display: 'none' },
    },
    tooltip: {
      useHTML: true, // Cho phép HTML trong tooltip
      formatter: function () {
        const locked =
          mockData.find((item) => item.name === this.name)?.locked || 0;
        const unlocked =
          mockData.find((item) => item.name === this.name)?.unlocked || 0;
        return `
          <div style="font-size: 13px; color: #333; font-weight: bold;">
            Allocation: <span style="color: #0073E6">${this.name}</span>
          </div>
          ${
            locked > 0
              ? `<div style="color: #707070; font-size: 12px;">
            Locked: <b> ${locked}%</b>  for Supply
          </div>`
              : ''
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
          color: 'rgba(0, 0, 0, 0.1)',
          offsetX: 2,
          offsetY: 2,
          opacity: 0.5,
          width: 5,
        },
        dataLabels: {
          enabled: true,
          format: '{point.name}: <b>{point.y}%</b>',
          style: { fontSize: '12px', fontWeight: 'bold', textOutline: 'none' },
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
        type: 'pie',
        name: 'Category',
        size: '100%',
        borderWidth: 0,
        innerSize: '62%', // Tạo khoảng trống nhưng không có vòng trong
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#fff',
            textOutline: 'none',
          },
        },
        data: chartData,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default HighNestedPieChart;
