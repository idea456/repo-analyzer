import { CHANGE_LOADING, SET_DASHBOARD } from "../types/dashboard";
import ApolloClient, { gql } from "apollo-boost";

export function changeLoading() {
  return {
    type: CHANGE_LOADING
  };
}

export function setDashboard(payload) {
  return {
    type: SET_DASHBOARD,
    payload
  };
}
// the apollo client
const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: async operation => {
    operation.setContext({
      headers: {
        authorization: `token 2dbefd40aa5bbfa16778fa85c1641a8b2ba47142`
      }
    });
  }
});

export function getDashboardData(owner, name) {
  return async function(dispatch, setState) {
    const data = gql`
{
  user: search(type: USER, query: "type:user") {
    userCount
  }

  repository(owner: "${owner}", name: "${name}") {
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
}`;
    if (owner !== "owner" && name !== "name") {
      client
        .query({
          query: data
        })
        .then(result =>
          dispatch({
            type: SET_DASHBOARD,
            payload: {
              loading: false,
              commits: result.data.repository.object.history.totalCount,
              branches: result.data.repository.refs.totalCount,
              releases: result.data.repository.releases.totalCount,
              forks: result.data.repository.forkCount,
              pull_requests: result.data.repository.pullRequests.totalCount,
              watch: result.data.repository.watchers.totalCount,
              stars: result.data.repository.stargazers.totalCount,
              issues: result.data.repository.issues.totalCount
            }
          })
        );
    }
  };
}
