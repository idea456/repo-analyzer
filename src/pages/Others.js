import React from "react";

import CardProgressBar from "../components/CardProgressBar";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Others extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={8}>
            <CardProgressBar
              title="Issues"
              first_value={20}
              second_value={80}
            />
            <CardProgressBar
              title="Pull requests"
              first_value={40}
              second_value={60}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Others;
