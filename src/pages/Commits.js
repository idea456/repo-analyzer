import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";

import {
  getCommitsData,
  changeLoading
} from "../store/action-creators/commits";

import CardTimeLineChart from "../components/CardTimeLineChart";
import CardTable from "../components/CardTable";
import CardBarChart from "../components/CardBarChart";

class Commits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: this.props.owner,
      name: this.props.name
    };
    this.labels = [];
  }

  async componentDidMount() {
    if (!this.props.searched) {
      this.props.history.push("/main");
    } else {
      // query the data
      this.props.getCommitsData(this.props.owner, this.props.name);
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
          <Container>
            <CardDeck style={{ width: "100%" }}>
              <CardTimeLineChart
                data={this.props.timeline_data}
                title="Total Commit activity"
                labels={this.props.timeline_labels}
                height={250}
              />
              <CardTable data={this.props.commits_data} />
            </CardDeck>

            <CardDeck style={{ width: "100%" }}>
              <CardBarChart
                data={this.props.timeline_additions}
                second_data={this.props.timeline_deletions}
                title="Code Additions"
                second_title="Code Deletions"
                height={500}
              />
            </CardDeck>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searched: state.global.searched,
    timeline_data: state.commits.timeline_data,
    timeline_labels: state.commits.timeline_labels,
    loading: state.commits.loading,
    commits_data: state.commits.commits_data,
    timeline_additions: state.commits.timeline_additions,
    timeline_deletions: state.commits.timeline_deletions
    // loading: state.commits.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoading: payload => dispatch(changeLoading(payload)),
    getCommitsData: (owner, name) => dispatch(getCommitsData(owner, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Commits)
);
