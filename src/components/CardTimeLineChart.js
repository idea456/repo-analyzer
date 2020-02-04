import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

class CardTimeLineChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.title,
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          data: this.props.data
        }
      ]
    };
  }

  render() {
    return (
      <Card style={{ height: this.props.height, marginTop: 10 }}>
        <Card.Body>
          <Line
            data={this.data}
            options={{
              maintainAspectRatio: false,
              scales: {
                xAxes: [
                  {
                    type: "time",
                    distribution: "linear"
                  }
                ]
              }
            }}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default CardTimeLineChart;
