import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navbar, Form, Button, Modal, Image } from "react-bootstrap";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store";

import Dashboard from "./pages/Dashboard";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      owner: "owner",
      name: "name",
      image: "",
      showModal: false,
      loading: false
    };
    this.textOwner = React.createRef();
    this.textName = React.createRef();

    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleShowModal = this.handleShowModal.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
  }

  async submitSearch() {
    const target = `https://api.github.com/users/${this.textOwner.current.value}/repos`;
    const data = await axios.get(target);
    this.setState({
      owner: this.textOwner.current.value,
      name: this.textName.current.value,
      image: data.data[0].owner.avatar_url,
      showModal: false,
      loading: false
    });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }

  handleShowModal() {
    this.setState({ showModal: true });
  }

  componentDidCatch() {
    alert("error!");
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Modal show={this.state.showModal} onHide={this.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Search for a repo</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Owner of repository</Form.Label>
                  <Form.Control
                    ref={this.textOwner}
                    placeholder="Enter owner of repository"
                  />
                  <Form.Text className="text-muted">
                    This is the original owner of the repository
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name of repository</Form.Label>
                  <Form.Control
                    ref={this.textName}
                    placeholder="Enter name of repository"
                  />
                  <Form.Text className="text-muted">
                    This is the original name of the repository
                  </Form.Text>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={this.submitSearch}>
                Search
              </Button>
            </Modal.Footer>
          </Modal>

          <Navbar className="navbar" sticky="top">
            <Navbar.Brand>
              <strong>REPO ANALYZER</strong>
            </Navbar.Brand>

            <Button
              className="ml-auto"
              style={{ marginRight: 15 }}
              variant="outline-info"
              size="lg"
              onClick={this.handleShowModal}
            >
              Search for a repo
            </Button>
          </Navbar>

          {/* the sidebar */}
          <div className="wrapper">
            <div className="sidebar-profile">
              <Image
                style={{ width: 100 }}
                resizeMode="contain"
                src={
                  this.state.image === ""
                    ? require("./images/empty.jpg")
                    : this.state.image
                }
                roundedCircle
              />
              <h3 style={{ marginTop: 10 }}>
                <strong>{this.state.name}</strong>
              </h3>
              <h4>
                <i style={{ fontSize: 20 }}>{this.state.owner}</i>
              </h4>
            </div>

            <div className="sidebar">
              <ul className="list-unstyled">
                <li>
                  <Link className="sidebar-link" to="/dashboard">
                    <strong>Dashboard</strong>
                  </Link>
                </li>
                <li>
                  <Link className="sidebar-link" to="/commits">
                    <strong>Commits</strong>
                  </Link>
                </li>
                <li>
                  <Link className="sidebar-link" to="/timeline">
                    <strong>Timeline</strong>
                  </Link>
                </li>
                <li>
                  <Link className="sidebar-link" to="/files">
                    <strong>Files</strong>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="main-content">
              <Switch>
                <Route path="/dashboard">
                  <Dashboard
                    owner={this.state.owner}
                    name={this.state.name}
                    loading={false}
                  />
                </Route>

                <Route path="/commits">
                  <h1>Commits</h1>
                </Route>

                <Route path="/timeline">
                  <h1>Timeline</h1>
                </Route>

                <Route path="/files">
                  <h1>Files</h1>
                </Route>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
