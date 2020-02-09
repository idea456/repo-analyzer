import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getContributorsData } from "../store/action-creators/contributors";
import { setError } from "../store/action-creators/global";

import Error from "../pages/Error";
import ContributorsTable from "../components/ContributorsTable";
import Image from "react-bootstrap/Image";
import CardDeck from "react-bootstrap/CardDeck";

class Contributors extends React.Component {
  componentDidMount() {
    if (!this.props.searched) {
      this.props.history.push("/main");
    } else if (this.props.error) {
      this.props.history.push("/error");
    } else {
      // query the data
      this.props.getContributorsData(this.props.owner, this.props.name);
    }
  }

  render() {
    if (this.props.error) {
      return <Error />;
    } else {
      return (
        <div>
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
              <Image
                style={{ width: 300, marginBottom: 20 }}
                resizeMode="contain"
                src={require("../images/cat.gif")}
              />
              <br />
              <h3>Loading the data...</h3>
            </div>
          )}
          {!this.props.loading && (
            <div>
              <ContributorsTable
                contributors_data={this.props.contributors_data}
              />
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    searched: state.global.searched,
    loading: state.contributors.loading,
    contributors_data: state.contributors.contributors_data,
    error: state.global.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: isError => dispatch(setError(isError)),
    getContributorsData: (owner, name) =>
      dispatch(getContributorsData(owner, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contributors)
);
