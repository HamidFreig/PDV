import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraficoCircularIE({ listI, listE }) {
  var options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  var data = {
    labels: ["INGRESO", "EGRESO"],
    datasets: [
      {
        label: "MONTO",
        data: [
          listI.reduce((acc, curr) => acc + curr.MontoIngreso, 0),
          listE.reduce((acc, curr) => acc + curr.MontoEgreso, 0),
        ],
        backgroundColor: ["#F3FF00", "#FF000C"],
        borderColor: ["#000000", "#000000"],
        borderWidth: 1,
      },
    ],
  };

  return <Pie style={{ height: "300px" }} data={data} options={options} />;
}
