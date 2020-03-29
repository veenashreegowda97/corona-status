import React from "react";
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
charts(FusionCharts);

function PieGraph(props) {
  const dataSource = {
    chart: {
      caption: "Based on country",
      plottooltext: "<b>$percentValue</b> of $label cases found",
      showlegend: "1",
      showpercentvalues: "1",
      legendposition: "bottom",
      usedataplotcolorforlabels: "1",
      theme: "fusion"
    },
    data: props.data
  };
  return (
    <ReactFusioncharts
      type="pie2d"
      width={window.screen.width > 768 ? "40%" : "100%"}
      height={window.screen.width > 768 ? "45%" : "50%"}
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default React.memo(PieGraph);
