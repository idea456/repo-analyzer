import React from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

class CardBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: this.props.labels,
      datasets: [
        {
          label: this.props.title,
          barThickness: 4,
          fill: false,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          data: this.props.data
        },
        {
          label: this.props.second_title,
          barThickness: 4,
          fill: false,
          backgroundColor: "rgba(255,99,132,1)",
          borderColor: "rgba(255,99,132,1)",
          data: this.props.second_data
        }
      ]
    };
  }

  render() {
    return (
      <Card style={{ marginTop: 10, height: this.props.height }}>
        <Card.Body>
          <Bar
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

export default CardBarChart;
