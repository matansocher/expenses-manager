import React, { Component } from 'react';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { getPieChartData } from '../../services/common_methods';

am4core.useTheme(am4themes_animated);

export default class FormInputDate extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {

    let chart = am4core.create(this.props.chartId, am4charts.PieChart);
    chart.data = getPieChartData(this.props.chartDate, this.props.fieldToGroupBy);

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "sum";
    pieSeries.dataFields.category = this.props.fieldToGroupBy;

    this.chart = chart;
  }

  componentDidUpdate(oldProps) {
    // if (oldProps.paddingRight !== this.props.paddingRight) {
    //   this.chart.paddingRight = this.props.paddingRight;
    // }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return(
      <div className="chart-wrapper">
        <h2>{this.props.header}</h2>
        <div id={this.props.chartId} className="chart"></div>
      </div>
    );
  }
}
