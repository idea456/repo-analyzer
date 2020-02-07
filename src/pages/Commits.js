import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import CardDeck from "react-bootstrap/CardDeck";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import {
  getCommitsData,
  changeLoading
} from "../store/action-creators/commits";

import CardTimeLineChart from "../components/CardTimeLineChart";
import CardTable from "../components/CommitsTable";
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
            <Image
              style={{ width: 300 }}
              resizeMode="contain"
              src={require("../images/cat.gif")}
            />
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
                titleDisplay={true}
                legendDisplay={false}
                mainTitle="Weekly commit activity"
                height={300}
              />
              <CardTable data={this.props.commits_data} />
            </CardDeck>

            <CardDeck style={{ width: "100%" }}>
              <CardTimeLineChart
                data={this.props.commit_count_all}
                second_data={this.props.commit_count_owner}
                labels={this.props.timeline_labels}
                mainTitle="Commit count for all users"
                titleDisplay={true}
                legendDisplay={false}
                height={280}
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
    commit_count_all: state.commits.commit_count_all,
    commit_count_owner: state.commits.commit_count_owner
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
