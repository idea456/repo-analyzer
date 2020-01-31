import React from "react";

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
      </div>
    );
  }
}

export default Main;
