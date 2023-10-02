import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie,Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);




 const DoughnutChart=(props)=> {
    const data = {
        labels:props.lables,
        datasets:[
          {
            label: props.title,
            data: props.values,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(54, 162, 235)',
              'rgba(255, 206, 86)',
              'rgba(75, 192, 192)',
              'rgba(153, 102, 255)',
              'rgba(255, 159, 64)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,

            
          },
          
        ],
      };
  return (
    <div style={{height: "300px"}}> 

  <Doughnut data={data}   options={{ maintainAspectRatio: false }} /></div>);
}
export default DoughnutChart;