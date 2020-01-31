import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

class CardPieChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ margin: 10, height: 300 }}>
        <Card.Body>
          <Doughnut data={data} options={{ maintainAspectRatio: false }} />
        </Card.Body>
      </Card>
    );
  }
}

export default CardPieChart;
