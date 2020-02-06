import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCodeFrequencyData } from "../store/action-creators/code_frequency";

import CardBarChart from "../components/CardBarChart";
import CodeFrequencyTable from "../components/CodeFrequencyTable";
import Sparkline from "../components/Sparkline";

import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";

class CodeFrequency extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    if (!this.props.searched) {
      this.props.history.push("/main");
    } else {
      // query the data
      this.props.getCodeFrequencyData(this.props.owner, this.props.name);
      console.log("contributors data: ", this.props.contributors_data);
    }
  }

  render() {
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
            <Spinner animation="border" variant="info" />
            <br />
            <h3>Loading the data...</h3>
          </div>
        )}
        {!this.props.loading && (
          <div>
            <CardDeck style={{ width: "100%" }}>
              <CodeFrequencyTable
                contributors_data={this.props.contributors_data}
              />
            </CardDeck>
            <CardDeck style={{ width: "100%" }}>
              <CardBarChart
                data={this.props.code_additions}
                second_data={this.props.code_deletions}
                title="Code Additions"
                second_title="Code Deletions"
                height={400}
              />
            </CardDeck>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searched: state.global.searched,
    loading: state.code_frequency.loading,
    code_additions: state.code_frequency.code_additions,
    code_deletions: state.code_frequency.code_deletions,
    contributors_data: state.code_frequency.contributors_data
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
