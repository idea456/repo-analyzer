import React from "react";
import { Line } from "react-chartjs-2";

class Sparkline extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: this.fillArray("", 223),
      datasets: [
        {
          fill: false,
          borderColor: this.props.borderColor,
          data: this.props.data
        }
      ]
    };
  }

  // credits to https://stackoverflow.com/questions/12503146/create-an-array-with-same-element-repeated-multiple-times/24665085
  fillArray(value, len) {
    if (len === 0) return [];
    var a = [value];
    while (a.length * 2 <= len) a = a.concat(a);
    if (a.length < len) a = a.concat(a.slice(0, len - a.length));
    return a;
  }

  render() {
    return (
      <div style={{ width: 200, height: 40 }}>
        <Line
          data={this.data}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: false
            },
            elements: {
              line: {
                borderColor: "#000000",
                borderWidth: 1
              },
              point: {
                radius: 0
              }
            },
            scales: {
              yAxes: [
                {
                  display: false
                }
              ],
              xAxes: [
                {
                  display: false
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default Sparkline;
