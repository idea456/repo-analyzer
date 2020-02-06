import React from "react";
import "../styles/Commits.css";

import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";

import Sparkline from "../components/Sparkline";

class CodeFrequencyTable extends React.Component {
  constructor(props) {
    super(props);
  }

  setupSparkline(array, type) {
    if (type === "additions") {
      let additions = [];
      for (let i = 0; i < array.length; i++) {
        additions.push(array[i].a);
      }
      return <Sparkline data={additions} borderColor="rgba(75,192,192,1)" />;
    } else if (type === "deletions") {
      let deletions = [];
      for (let i = 0; i < array.length; i++) {
        deletions.push(array[i].d);
      }
      return <Sparkline data={deletions} borderColor="rgba(255,99,132,1)" />;
    }
  }

  render() {
    return (
      <div className="card my-custom-scrollbar .table-wrapper-scroll-y">
        <Table hover>
          <thead>
            <tr>
              <th></th>
              <th>Contributor</th>
              <th>Total Commit count</th>
              <th>Additions</th>
              <th>Deletions</th>
            </tr>
          </thead>
          <tbody>
            {this.props.contributors_data.map((data, i) => {
              return (
                <tr key={i} onClick={() => console.log("clicked table ", i)}>
                  <td>
                    <Image
                      style={{ width: 40 }}
                      resizeMode="contain"
                      src={(() => {
                        try {
                          return data.author.avatar_url;
                        } catch {
                          return require("../images/empty.jpg");
                        }
                      })()}
                      roundedCircle
                    />
                  </td>
                  <td>{data.author.login}</td>
                  <td>{data.total}</td>
                  <td>{this.setupSparkline(data.weeks, "additions")}</td>
                  <td>{this.setupSparkline(data.weeks, "deletions")}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default CodeFrequencyTable;
