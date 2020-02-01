import React from "react";
import { Line } from "react-chartjs-2";
import { Card } from "react-bootstrap";

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "My First dataset",
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class CardLineChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ margin: 10, height: 300 }}>
        <Card.Body>
          <Line data={data} options={{ maintainAspectRatio: false }} />
        </Card.Body>
      </Card>
    );
  }
}

export default CardLineChart;
