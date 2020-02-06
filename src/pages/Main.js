import React from "react";
import Button from "react-bootstrap/Button";

class Main extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "30px",
          flexDirection: "column"
        }}
      >
        <h2>Click the button 'Search for a repo' to begin searching!</h2>
        <Button
          size="lg"
          variant="outline-info"
          style={{ marginTop: 20 }}
          onClick={this.props.handleShowModal}
        >
          Search for a repo
        </Button>
      </div>
    );
  }
}

export default Main;
