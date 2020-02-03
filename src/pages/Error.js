import React from "react";

class Error extends React.Component {
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
        <h2>Oh no! An error occured!</h2>
        <i>P.S. Most likely it's a non existing repository name or owner </i>
      </div>
    );
  }
}

export default Error;
