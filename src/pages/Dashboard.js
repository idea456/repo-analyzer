import React from "react";
import "../styles/Dashboard.css";
import CardPiece from "../components/CardPiece";
import ApolloClient, { gql } from "apollo-boost";
import { CardDeck, Spinner } from "react-bootstrap";

import { connect } from "react-redux";
import {
  changeLoading,
  setDashboard
} from "../store/action-creators/dashboard";

// the apollo client
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `token 7517703b0d0fc218bedde222f2f3a24ee60b4d7b`
      }
    });
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owner: this.props.owner,
      name: this.props.name
    };

    this.data = "";
    const {
      commits,
      branches,
      releases,
      forks,
      pull_requests,
      watch,
      stars,
      issues
    } = this.props;
  }

  componentDidUpdate() {
    this.data = gql`
      {
        user: search(type: USER, query: "type:user") {
          userCount
        }

        repository(owner: "${this.props.owner}", name: "${this.props.name}") {
        object(expression:"master") {
            ... on Commit {
                history {
                    totalCount
                }
            }
        }
          refs(first: 0, refPrefix: "refs/heads/") {
            totalCount
          }

          releases(first: 100) {
            totalCount
          }

          pullRequests(states: OPEN) {
            totalCount
          }

          watchers {
            totalCount
          }

          stargazers {
            totalCount
          }

          object(expression: "master") {
            ... on Commit {
              history {
                totalCount
              }
            }
          }

          issues(states: OPEN) {
            totalCount
          }

          forkCount
        }
      }
    `;
    // if user has entered and clicked on the search button
    if (this.props.owner !== "owner" && this.props.name !== "name") {
      client
        .query({
          query: this.data
        })
        .then(result =>
          this.props.setDashboard({
            commits: result.data.repository.object.history.totalCount,
            branches: result.data.repository.refs.totalCount,
            releases: result.data.repository.releases.totalCount,
            forks: result.data.repository.forkCount,
            pull_requests: result.data.repository.pullRequests.totalCount,
            watch: result.data.repository.watchers.totalCount,
            stars: result.data.repository.stargazers.totalCount,
            issues: result.data.repository.issues.totalCount
          })
        );
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
            <h3>Click the button 'Search for a repo' to begin searching!</h3>
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    loading: state.loading,
    commits: state.commits,
    branches: state.branches,
    releases: state.releases,
    forks: state.forks,
    pull_requests: state.pull_requests,
    watch: state.watch,
    stars: state.stars,
    issues: state.issues
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeLoading: () => dispatch(changeLoading()),
    setDashboard: payload => dispatch(setDashboard(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
