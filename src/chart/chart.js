import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"

const MyChart = ({ title, series }) => {
  const options = {
    chart: {
      type: "spline"
    },
    title: { text: title },
    series,
    xAxis: {
      //   title: {
      //     text: "Fruit Number"
      //   },
      tickInterval: 1
    },
    yAxis: {
      //   title: {
      //     text: "Fruit eaten"
      //   },
      //   tickInterval: 1
    }
  }
  return (
    <div style={{ padding: "20px" }}>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

MyChart.defaultProps = {
  title: "MyChart",
  series: [{ data: [1, 2, 3], name: "test1" }]
}

export { MyChart }
