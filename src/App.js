import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { Navbar, Nav, Form, Button, Modal, Image } from "react-bootstrap";

function App() {
  const [show, setShow] = useState(false);
  const handleShowModal = () => setShow(true);
  const handleCloseModal = () => setShow(false);

  return (
    <Router>
      <Modal show={show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Search for a repo</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Owner of repository</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter owner of repository"
              />
              <Form.Text className="text-muted">
                This is the original owner of the repository
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Name of repository</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter name of repository"
              />
              <Form.Text className="text-muted">
                This is the original name of the repository
              </Form.Text>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary">Search</Button>
        </Modal.Footer>
      </Modal>

      <Navbar className="navbar">
        <Navbar.Brand>
          <strong>DASHBOARD</strong>
        </Navbar.Brand>

        {/* <Nav className="mr-auto navbar-links">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
        </Nav> */}
        <Button
          className="ml-auto"
          style={{ marginRight: 15 }}
          variant="outline-info"
          size="lg"
          onClick={handleShowModal}
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
            src={require("./images/doge.jpeg")}
            roundedCircle
          />
          <h3>
            <strong>repo name</strong>
          </h3>
          <h4>
            <i style={{ fontSize: 20 }}>owner</i>
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
              <h1>Dashboard</h1>
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
  );
}

export default App;
