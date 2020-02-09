import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCodeFrequencyData } from "../store/action-creators/code_frequency";

import Error from "../pages/Error";
import CardBarChart from "../components/CardBarChart";

import CardDeck from "react-bootstrap/CardDeck";
import Image from "react-bootstrap/Image";

class CodeFrequency extends React.Component {
  async componentDidMount() {
    if (!this.props.searched) {
      this.props.history.push("/main");
    } else if (this.props.error) {
      this.props.history.push("/error");
    } else {
      // query the data
      this.props.getCodeFrequencyData(this.props.owner, this.props.name);
    }
  }

  render() {
    if (this.props.error) {
      return <Error />;
    } else {
      try {
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
                <CardDeck style={{ width: "100%" }}>
                  <CardBarChart
                    data={this.props.code_additions}
                    second_data={this.props.code_deletions}
                    title="Total Code Additions"
                    second_title="Total Code Deletions"
                    barThickness={4}
                    titleDisplay={false}
                    legendDisplay={true}
                    height={window.innerHeight * 0.83}
                  />
                </CardDeck>
              </div>
            )}
          </div>
        );
      } catch {
        // reload the page if the CodeFrequencyTable has not finished loading data yet
        this.props.history.push("/main");
        this.props.history.push("/code-frequency");
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    searched: state.global.searched,
    loading: state.code_frequency.loading,
    code_additions: state.code_frequency.code_additions,
    code_deletions: state.code_frequency.code_deletions,
    error: state.global.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCodeFrequencyData: (owner, name) =>
      dispatch(getCodeFrequencyData(owner, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CodeFrequency)
);
