import React from "react";
import "../styles/Dashboard.css";
import CardPiece from "../components/CardPiece";
import CardPieChart from "../components/CardPieChart";
import CardLineChart from "../components/CardLineChart";
import { CardDeck, Spinner } from "react-bootstrap";

import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import {
  changeLoading,
  setDashboard,
  getDashboardData
} from "../store/action-creators/dashboard";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: this.props.owner,
      name: this.props.name
    };

    this.data = "";
  }

  componentDidMount() {
    if (!this.props.searched) {
      this.props.history.push("/main");
    } else {
      // query the data
      this.props.getDashboardData(this.props.owner, this.props.name);
    }
  }

  render() {
    return (
      <React.Fragment>
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
              <CardPiece title="Commits" text={this.props.commits} />
              <CardPiece title="Branches" text={this.props.branches} />
              <CardPiece title="Releases" text={this.props.releases} />
              <CardPiece title="Forks" text={this.props.forks} />
            </CardDeck>

            <CardDeck style={{ width: "100%" }}>
              <CardPiece
                title="Pull requests"
                text={this.props.pull_requests}
              />
              <CardPiece title="Watch" text={this.props.watch} />
              <CardPiece title="Stars" text={this.props.stars} />
              <CardPiece title="Issues" text={this.props.issues} />
            </CardDeck>

            <CardDeck style={{ width: "100%" }}>
              <CardPieChart />
              <CardLineChart />
            </CardDeck>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.dashboard.loading,
    commits: state.dashboard.commits,
    branches: state.dashboard.branches,
    releases: state.dashboard.releases,
    forks: state.dashboard.forks,
    pull_requests: state.dashboard.pull_requests,
    watch: state.dashboard.watch,
    stars: state.dashboard.stars,
    issues: state.dashboard.issues,
    searched: state.global.searched
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoading: () => dispatch(changeLoading()),
    setDashboard: payload => dispatch(setDashboard(payload)),
    getDashboardData: (owner, name) => dispatch(getDashboardData(owner, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
