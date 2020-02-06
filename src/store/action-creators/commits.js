import { CHANGE_LOADING, SET_COMMITS } from "../types/commits";
import axios from "axios";

export function changeLoading(payload) {
  return {
    type: CHANGE_LOADING,
    payload
  };
}
export function getCommitsData(owner, name) {
  return async function(dispatch, getState) {
    dispatch({
      type: CHANGE_LOADING,
      payload: true
    });
    // query the data
    //   this.props.changeLoading(true);
    const url = `https://api.github.com/repos/${owner}/${name}/stats/commit_activity`;
    const { data } = await axios.get(url);

    const commits_url = `https://api.github.com/repos/${owner}/${name}/commits`;
    const response = await axios.get(commits_url);
    let commit_labels = [];
    let commit_data = [];

    for (let i = 0; i < data.length; i++) {
      commit_labels.push(new Date(data[i].week * 1000).toISOString());
      commit_data.push({
        t: new Date(data[i].week * 1000).toISOString(),
        y: data[i].total
      });
    }

    const commit_count = await axios.get(
      `https://api.github.com/repos/${owner}/${name}/stats/participation`
    );
    console.log(commit_count);
    const commit_count_all = commit_count.data.all;
    const commit_count_owner = commit_count.data.owner;
    console.log("commit count: ", commit_count_all, commit_count_owner);

    dispatch({
      type: SET_COMMITS,
      payload: {
        loading: false,
        timeline_labels: commit_labels,
        timeline_data: commit_data,
        commits_data: response.data,
        commit_count_all,
        commit_count_owner
      }
    });
  };
}
