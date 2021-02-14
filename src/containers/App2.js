import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import UpdateUser from "../components/user/UpdateUser";
import AddUser from '../components/user/AddUser';
import UsersList from "../components/user/UsersList";
import SeasonList from "../components/season/SeasonList";
import UpdateSeason from "../components/season/UpdateSeason";
import AddSeason from "../components/season/AddSeason";
import EventList from "../components/event/EventList";

function App() {
    return (
        <Router>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <a href="/users" className="navbar-brand">
                        Eckhardo
                    </a>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/users"} className="nav-link">
                                User
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to={"/seasons"} className="nav-link">
                                Season
                            </Link>
                        </li>
                        <li className="nav-item">

                            <Link to={"/events"} className="nav-link">
                                Events
                            </Link>


                        </li>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/users"]} component={UsersList}/>
                        <Route path="/users" component={UsersList}/>
                        <Route path="/addUser" component={AddUser}/>
                        <Route path="/user/:user_name" component={UpdateUser}/>
                        <Route path="/seasons" component={SeasonList}/>
                        <Route path="/season/:season_year" component={UpdateSeason}/>
                        <Route path="/addSeason" component={AddSeason}/>
                        <Route path="/events" component={EventList}/>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;






