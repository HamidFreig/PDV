import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function GraficoCircularMontos({ list }) {
  var data = {
    labels: ["EFECTIVO", "DEBITO", "CREDITO"],
    datasets: [
      {
        label: "MONTO",
        data: [
          list.reduce((acc, curr) => acc + curr.MontoEfectivo, 0),
          list.reduce((acc, curr) => acc + curr.MontoDebito, 0),
          list.reduce((acc, curr) => acc + curr.MontoCredito, 0),
        ],
        backgroundColor: ["#8FFF00", "#FF000C", "#008FFF"],
        borderColor: ["#000000"],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut style={{ height: "300px" }} data={data} options={options} />;
}
