import { CHANGE_LOADING, SET_DASHBOARD } from "../types/dashboard";
import ApolloClient, { gql } from "apollo-boost";
import { onError } from "apollo-link-error";
import { createHttpLink } from "apollo-link-http";
import axios from "axios";
import { SET_ERROR } from "../types/global";

let token = "418c0886216f6be2b8a53154a8a62d984d345d8c1";

function getToken(token) {
  return token.substring(0, token.length - 1);
}

export function changeLoading(payload) {
  return {
    type: CHANGE_LOADING,
    payload
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
        authorization: `token ${getToken(token)}`
      }
    });
  }
});

export function getDashboardData(owner, name) {
  return async function(dispatch, setState) {
    try {
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
      // if the user has searched
      if (owner !== "owner" && name !== "name") {
        // quering the popularity section
        let page = 1;
        let next_popularity_data = [];
        let popularity_url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}`;
        let popularity = await axios.get(popularity_url);
        let popularity_data = popularity.data;
        let language_labels = [];
        let language_data = [];
        popularity_url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page +
          1}
      }`;
        next_popularity_data = await axios.get(popularity_url);

        // use pagination to go to the next page if there is more than 100 repositories
        while (next_popularity_data.data.length !== 0) {
          console.log(next_popularity_data.data);
          page += 1;
          popularity_url = `https://api.github.com/users/${owner}/repos?per_page=100&page=${page}`;
          next_popularity_data = await axios.get(popularity_url);
          popularity_data = popularity_data.concat(next_popularity_data.data);
        }

        const popularity_datasets = [];
        const popularity_labels = [];

        for (let i = 0; i < popularity_data.length; i++) {
          popularity_datasets.push(popularity_data[i].stargazers_count);
          popularity_labels.push(popularity_data[i].name);
          language_data.push(popularity_data[i].language);
        }

        // credits to https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
        language_labels = language_data.filter(function(elem, index, self) {
          return index === self.indexOf(elem);
        });

        // credits to https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
        var language_counts = {};
        language_data.forEach(function(x) {
          language_counts[x] = (language_counts[x] || 0) + 1;
        });

        var language_count = Object.keys(language_counts).map(function(key) {
          return language_counts[key];
        });
        let indexNull = language_labels.indexOf(null);

        language_labels.splice(indexNull, 1);
        language_count.splice(indexNull, 1);

        const repo_index = popularity_labels.indexOf(name);
        popularity_labels.splice(repo_index, 1).unshift(name);
        popularity_datasets.unshift(
          popularity_datasets.splice(repo_index, 1)[0]
        );

        // quering the overview section
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
                issues: result.data.repository.issues.totalCount,
                popularity_data: popularity_datasets,
                popularity_labels: popularity_labels,
                language_labels: language_labels.filter(i => i !== null),
                language_count
              }
            })
          )
          .catch(error => {
            if (
              error.message ===
              `GraphQL error: Could not resolve to a Repository with the name '${name}'.`
            ) {
              dispatch({
                type: SET_ERROR,
                payload: {
                  error: true,
                  msg: "Repository name does not exist with owner!"
                }
              });
            }
          });
      }
    } catch {
      dispatch({
        type: SET_ERROR,
        payload: true
      });
    }
  };
}
