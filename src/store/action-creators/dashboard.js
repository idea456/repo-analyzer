import { CHANGE_LOADING, SET_DASHBOARD } from "../types/dashboard";
import ApolloClient, { gql } from "apollo-boost";
import axios from "axios";

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
        authorization: `token d19221a9ab540d9301a1c9e5592033b57ee7f2c3`
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

      if (popularity_data.length % 100 === 0) {
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
      console.log(language_labels);

      // credits to https://stackoverflow.com/questions/19395257/how-to-count-duplicate-value-in-an-array-in-javascript
      var language_counts = {};
      language_data.forEach(function(x) {
        language_counts[x] = (language_counts[x] || 0) + 1;
      });

      var language_count = Object.keys(language_counts).map(function(key) {
        return language_counts[key];
      });

      console.log(language_count);

      const repo_index = popularity_labels.indexOf(name);
      popularity_labels.splice(repo_index, 1).unshift(name);
      popularity_datasets.unshift(popularity_datasets.splice(repo_index, 1)[0]);

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
              language_labels,
              language_count
            }
          })
        );
    }
  };
}
