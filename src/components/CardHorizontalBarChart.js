import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { Card } from "react-bootstrap";

class CardHorizontalBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.data = {
      labels: this.props.labels,
      datasets: [
        {
          backgroundColor: "rgba(54,132,142,1)",
          data: this.props.data,
          borderWidth: 1,
          borderColor: "rgba(54,132,142,1)",
          hoverBackgroundColor: "rgba(54,132,142,1)",
          hoverBorderColor: "rgba(54,132,142,1)"
        }
      ]
    };
  }

  render() {
    return (
      <Card style={{ margin: 10, height: 300 }}>
        <Card.Body>
          <HorizontalBar
            data={this.data}
            options={{
              maintainAspectRatio: false,
              title: { display: true, text: this.props.title },
              legend: { display: false }
            }}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default CardHorizontalBarChart;
