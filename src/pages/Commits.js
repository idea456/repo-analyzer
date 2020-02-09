import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Error from "../pages/Error";
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
    } else if (this.props.error) {
      this.props.history.push("/error");
    } else {
      // query the data
      this.props.getCommitsData(this.props.owner, this.props.name);
    }
  }

  refreshPage() {
    console.log("refreshing...");
    this.props.history.push("/main");
    this.props.history.push("/commits");
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
                  refreshPage={this.refreshPage}
                />
                <CardTable data={this.props.commits_data} />
              </CardDeck>

              <CardDeck style={{ width: "100%" }}>
                <CardBarChart
                  data={this.props.timeline_data}
                  title="Total Commit activity"
                  labels={this.props.timeline_labels}
                  titleDisplay={true}
                  legendDisplay={false}
                  mainTitle="Total commit count"
                  barThickness={15}
                  height={300}
                  refreshPage={this.refreshPage}
                />
              </CardDeck>
            </Container>
          )}
        </div>
      );
    }
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
    commit_count_owner: state.commits.commit_count_owner,
    error: state.global.error
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
