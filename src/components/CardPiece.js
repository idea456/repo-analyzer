import React from "react";
import "../styles/Dashboard.css";

import { Card } from "react-bootstrap";

class CardPiece extends React.Component {
  render() {
    return (
      <Card
        className="shadow-sm bg-white rounded"
        style={{
          textAlign: "center",
          margin: 10,
          height: 120
        }}
      >
        <Card.Body>
          <Card.Title>
            <h4>
              <strong>{this.props.title}</strong>
            </h4>
          </Card.Title>
          <Card.Text>
            <h1>
              <strong>{this.props.text}</strong>
            </h1>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default CardPiece;
