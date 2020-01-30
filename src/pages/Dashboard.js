import React from "react";
import "../styles/Dashboard.css";

import CardPiece from "../components/CardPiece";

import ApolloClient, { gql } from "apollo-boost";
import { CardDeck, Card, Spinner } from "react-bootstrap";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // if (this.props.owner !== "" && this.props.name !== "") {
    // }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "30px",
              flexDirection: "column"
            }}
          >
            <Spinner animation="border" />
            <br />
            <h3>Loading data...</h3>
          </div>
        )}
        {!this.props.loading && (
          <div>
            <CardDeck style={{ width: "100%" }}>
              <CardPiece title="Commits" text="123" />
              <CardPiece title="Branches" text="123" />
              <CardPiece title="Releases" text="123" />
              <CardPiece title="Forks" text="123" />
            </CardDeck>

            <CardDeck style={{ width: "100%" }}>
              <CardPiece title="Pull requests" text="123" />
              <CardPiece title="Watch" text="123" />
              <CardPiece title="Stars" text="123" />
              <CardPiece title="Issues" text="123" />
            </CardDeck>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Dashboard;
