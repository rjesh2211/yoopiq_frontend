import React from "react";
import { Radar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);


const RadarChart=(props)=> {

  return (
    <div style={{height:"300px",width:"100%"}}>

      <Radar
        data={{
          // x-axis label values
          labels: props.lables,
          datasets: [
            {
              label: props.title,
              // y-axis data plotting values
              data: props.values,
              borderWidth:4,
              backgroundColor: props.bg,
              borderColor:props.border,
              responsive:true

            },
            
          ],
          
        }}
        options={{ maintainAspectRatio: false }}

        
      />
    </div>
  );
}

export default RadarChart;