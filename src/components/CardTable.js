import React from "react";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import "../styles/Commits.css";

class CardTable extends React.Component {
  constructor(props) {
    super(props);
  }

  formatMessage(message) {
    let ret = "";
    if (message.length >= 35) {
      ret = message.substring(0, 35) + "...";
    }
    return ret;
  }

  render() {
    return (
      <div className="card my-custom-scrollbar .table-wrapper-scroll-y">
        <div class="card-header">
          <strong>Recent commits</strong>
        </div>
        <table className="table">
          <tbody>
            {this.props.data.map(data => {
              return (
                <tr>
                  <td>
                    <Image
                      style={{ width: 40 }}
                      resizeMode="contain"
                      src={data.author.avatar_url}
                      roundedCircle
                    />
                  </td>
                  <td>{this.formatMessage(data.commit.message)}</td>
                  <td>
                    <Button
                      variant="info"
                      onClick={() => {
                        window.location.href = data.html_url;
                      }}
                    >
                      Show more
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CardTable;
