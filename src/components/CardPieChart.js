import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";

class CardPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: [this.props.name].concat(this.props.labels),
      datasets: [
        {
          data: this.props.data,
          backgroundColor: ["#FF6384"],
          hoverBackgroundColor: ["#FF6384"]
        }
      ]
    };
  }

  render() {
    return (
      <Card style={{ margin: 10, height: 300 }}>
        <Card.Body>
          <Doughnut
            data={this.data}
            options={{
              maintainAspectRatio: false,
              title: { display: true, text: this.props.title },
              legend: { display: this.props.legend }
            }}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default CardPieChart;
