



import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React from "react";
import {Navbar, Nav, NavDropdown} from "react-bootstrap";
import UsersList from "./components/user/UsersList";
import AddUser from "./components/user/AddUser";
import UpdateUser from "./components/user/UpdateUser";
import SeasonList from "./components/season/SeasonList";
import UpdateSeason from "./components/season/UpdateSeason";
import AddSeason from "./components/season/AddSeason";
import EventList from "./components/event/EventList";
function App2() {
  return (
      <Router>
        <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/home">AIGE Fishing Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="/users">Users</Nav.Link>
                <Nav.Link href="/seasons">Seasons</Nav.Link>
                <NavDropdown title="Events" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="/events">Season 2020</NavDropdown.Item>
                  <NavDropdown.Item href="/events">Season 2021</NavDropdown.Item>
                  <NavDropdown.Item href="/events">Season2022</NavDropdown.Item>
                  <NavDropdown.Divider />
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">Login</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  Dank memes
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>


          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/users"]} component={UsersList} />
              <Route path="/users" component={UsersList} />
              <Route  path="/addUser" component={AddUser} />
              <Route path="/user/:user_name" component={UpdateUser} />
              <Route path="/seasons" component={SeasonList} />
              <Route path="/season/:season_year" component={UpdateSeason} />
              <Route  path="/addSeason" component={AddSeason} />
              <Route path="/events" component={EventList} />
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App2;
