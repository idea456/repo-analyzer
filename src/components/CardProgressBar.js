import React from "react";

import Card from "react-bootstrap/Card";
import ProgressBar from "react-bootstrap/ProgressBar";

class CardProgressBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card style={{ marginTop: 10 }}>
        <Card.Body>
          <Card.Title>{this.props.title}</Card.Title>
          <ProgressBar>
            <ProgressBar animated variant="info" now={this.props.first_value} />
            <ProgressBar
              animated
              variant="danger"
              now={this.props.second_value}
            />
          </ProgressBar>
        </Card.Body>
      </Card>
    );
  }
}
export default CardProgressBar;
