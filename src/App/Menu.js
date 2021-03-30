import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import Seasons from "../components/Seasons/Seasons";
import Events from "../components/Events/Events";
import Users from "../components/Users/Users";


const Menu = (props) => {


    return (
        <BrowserRouter>

                <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                    <Navbar.Brand href="/home">AIGE Fishing Club</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/users">Users</Nav.Link>
                            <Nav.Link href="/seasons">Seasons</Nav.Link>
                            <Nav.Link href="/events">Events</Nav.Link>
                        </Nav>
                        <Nav>
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>


                <div className="container mt-2" style={{maxWidth: "800px"}}>
                    <Switch>
                        <Route exact path={["/", "/users"]} component={Users}/>
                        <Route path="/seasons"> <Seasons/> </Route>
                        <Route path="/events" component={Events}/>
                    </Switch>
                </div>
                {props.children}

        </BrowserRouter>
    );

}

export default Menu;
