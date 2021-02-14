import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import UsersList from "../components/user/UsersList";
import AddUser from "../components/user/AddUser";
import UpdateUser from "../components/user/UpdateUser";
import SeasonList from "../components/season/SeasonList";
import UpdateSeason from "../components/season/UpdateSeason";
import AddSeason from "../components/season/AddSeason";
import EventList from "../components/event/EventList";
import classes from "./layout.css";
const Layout = (props) => {


    return (
        <BrowserRouter>
            <div >
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand href="/home">AIGE Fishing Club</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/users">Users</Nav.Link>
                            <Nav.Link href="/seasons">Seasons</Nav.Link>
                            <Nav.Link href="/events">Events</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link href="#deets">Login</Nav.Link>
                            <Nav.Link eventKey={2} href="#memes">
                                Dank memes
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <div className="container mt-2"style={{maxWidth: "700px"}}>
                    <Switch>
                        <Route exact path={["/", "/users"]} component={UsersList}/>
                        <Route path="/users" component={UsersList}/>
                        <Route path="/addUser" component={AddUser}/>
                        <Route path="/user/:user_name" component={UpdateUser}/>
                        <Route path="/seasons" component={SeasonList}/>
                        <Route path="/updateSeason/:season_year" component={UpdateSeason}/>
                        <Route path="/addSeason" component={AddSeason}/>
                        <Route path="/events" component={EventList}/>
                    </Switch>
                </div>
                {props.children}
            </div>
        </BrowserRouter>
    );

}

export default Layout;
