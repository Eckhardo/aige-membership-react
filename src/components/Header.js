import React from "react";
import {makeStyles} from "@material-ui/core";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Users from "./Users/Users";
import Events from "./Events/Events";
import {Nav, Navbar} from "react-bootstrap";


const useStyles= makeStyles( theme =>({
    root:{
        backgroundColor:'#fff',
        transform:'transformZ(0)',
        borderStyle: 'solid',
        borderWidth: '0px 0px 1px 0px',
        borderColor:'#4682b4'
    },
    searchInput:{
        opacity:'0.6',
        padding:'0px 8px',
        fontSize: '0.8rem',
        '&:hover':{
            backgroundColor:'#f2f2f2'
        },
        '& .MuiSvgIcon-root': {
            marginRight:theme.spacing(1)
        }
    }

}))

const Header = (props) => {
    const classes =useStyles();
   return ( <Router>
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


                 <Switch>
                    <Route exact path={["/", "/users"]} component={Users}/>
                    <Route path="/users" component={Users}/>
                    <Route path="/events" component={Events}/>
                </Switch>
            {props.children}
        </div>
    </Router>
   )
}
export default Header;
