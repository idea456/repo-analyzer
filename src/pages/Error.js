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
        <i>
          {this.props.msg === undefined
            ? "Most likely it is a non existent owner or repository name"
            : this.props.msg}
        </i>
      </div>
    );
  }
}

export default Error;
