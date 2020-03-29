import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);
function BarGraph(props) {
  const dataSource = {
    chart: {
      caption: "Based on country",
      subcaption: "For the year 2020",
      yaxisname: "Users count",
      decimals: "1",
      theme: "fusion"
    },
    data: props.data
  };
  return (
    <ReactFusioncharts
      type="column3d"
      width={window.screen.width > 768 ? "40%" : "100%"}
      height={window.screen.width > 768 ? "45%" : "80%"}
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default React.memo(BarGraph);
