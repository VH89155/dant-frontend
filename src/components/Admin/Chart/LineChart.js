import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function LineChart({ chartData }) {
  return <Line data={chartData}  options={{
    title: {
      display: true,
      text: "Doanh thu theo tháng năm 2023"
    },
    legend: {
      display: true,
      position: "bottom"
    }
  }} />;
}

export default LineChart;