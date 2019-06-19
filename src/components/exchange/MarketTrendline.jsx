'use strict';

import React from 'react';
import Dimensions from 'react-dimensions';
import { sortDesc, sortAsc } from '../../helpers/SortHelper.js';

class MarketTrendline extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  processData(data = this.props.data) {
    if (data.length > 1) {
      let bounds = {
        x: [+(new Date(data.sort(sortAsc(`date`, (d) => +(new Date(d))))[0].date)), +(new Date(data.sort(sortDesc(`date`, (d) => +(new Date(d))))[0].date))],
        y: [parseFloat(data.sort(sortAsc(`value`))[0].value), parseFloat(data.sort(sortDesc(`value`))[0].value)]
      };

      return {
        data, bounds
      };
    }

    return {
      data: [
        {
          date: 0,
          value: 0
        },
        {
          date: 1,
          value: 0
        }
      ],
      bounds: {
        x: [0, 1],
        y: [0, 1]
      }
    };
  }

  getPointsFromData({ data, bounds } = this.processData(this.state.data)) {
    let chartArea = this.getChartArea();

    return data.sort(sortAsc(`date`)).map((d) => ({
      top: 1 - ((d.value - bounds.y[0]) / (bounds.y[1] - bounds.y[0])),
      left: (d.date - bounds.x[0]) / (bounds.x[1] - bounds.x[0])
    })).map((p) => {
      return p;
    }).map((p) => `${ (p.left * chartArea.width) + chartArea.x },${ (p.top * chartArea.height) + chartArea.y }`).join(` `);
  }

  getChartArea() {
    return {
      x: 0.1 * this.props.containerWidth,
      y: 0.1 * this.props.containerHeight,
      width: this.props.containerWidth - (0.15 * this.props.containerWidth),
      height: this.props.containerHeight - (0.1 * this.props.containerHeight) - (0.15 * this.props.containerHeight)
    };
  }

  render() {
    if (!this.props.loaded) {
      return (
        <div className="market-trendline trend-loading"><div><div /><div /><div /><div /></div></div>
      );
    }

    let points = this.getPointsFromData();

    return (
      <div className="market-trendline">
        <svg
          width="100%"
          height="100%"
          viewBox={ `0 0 ${ this.props.containerWidth } ${ this.props.containerHeight }` }
          xmlns="http://www.w3.org/2000/svg">
          <polyline
            fill="none"
            stroke={ `currentColor` }
            strokeWidth="2"
            points={ points } />
        </svg>
      </div>
    );
  }
}

export default Dimensions()(MarketTrendline);
