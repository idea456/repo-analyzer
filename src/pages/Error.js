import React from "react";
import Image from "react-bootstrap/Image";
import { connect } from "react-redux";

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
        {/* credits to https://github.com/npentrel/octoclippy2 */}
        <Image
          style={{ width: 300, marginBottom: 20 }}
          resizeMode="contain"
          src={require("../images/robot.gif")}
        />
        <h2>Oh no! An error occured!</h2>
        <i>{this.props.error_msg}</i>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    error: state.global.error,
    error_msg: state.global.error_msg
  };
};

export default connect(mapStateToProps, null)(Error);
