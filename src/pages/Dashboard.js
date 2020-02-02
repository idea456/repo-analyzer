import React from "react";
import "../styles/Dashboard.css";
import CardPiece from "../components/CardPiece";
import CardPieChart from "../components/CardPieChart";
import CardHorizontalBarChart from "../components/CardHorizontalBarChart";
import { CardDeck, Spinner } from "react-bootstrap";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
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
      this.props.changeLoading(true);
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
              <CardPieChart
                data={this.props.popularity_data}
                labels={this.props.popularity_labels}
                legend={false}
                name={this.props.name}
                title="Popularity by stars compared to other repositories"
              />
              <CardHorizontalBarChart
                title="Language frequency"
                labels={this.props.language_labels}
                data={this.props.language_count}
              />
            </CardDeck>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
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
    searched: state.global.searched,
    popularity_data: state.dashboard.popularity_data,
    popularity_labels: state.dashboard.popularity_labels,
    language_labels: state.dashboard.language_labels,
    language_count: state.dashboard.language_count
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoading: payload => dispatch(changeLoading(payload)),
    setDashboard: payload => dispatch(setDashboard(payload)),
    getDashboardData: (owner, name) => dispatch(getDashboardData(owner, name))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
