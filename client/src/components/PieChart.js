import React from 'react'
import {Pie} from 'react-chartjs-2'
import {Chart as ChartJs} from 'chart.js/auto'

const PieChart = ({chartData,title}) => {
  return (
            <div style={{ position: "relative", height: "100%", width: "100%" }}>
    <Pie data={chartData} 
    options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: title,
          },
        },
      }}
    />    
             </div>


)
}

export default PieChart
