import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


const BarChart=(props)=> {

  return (
    <div style={{height:"300px",width:"100%"}}>

      <Bar
        data={{
          // x-axis label values
          labels: props.lables,
          datasets: [
            {
              label: props.title,
              // y-axis data plotting values
              data: props.values,
              borderWidth:4,
              backgroundColor: "rgb(53, 162, 235,0.5)",
              borderColor:'rgb(53, 162, 235)',
              responsive:true

            },
            
          ],
          
        }}
        options={{ maintainAspectRatio: false }}

        
      />
    </div>
  );
}

export default BarChart;