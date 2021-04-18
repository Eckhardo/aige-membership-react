import './App.css';
import React, {useState} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Users from "../components/Users/Users";
import Events from "../components/Events/Events"
import Seasons from "../components/Seasons/Seasons";
import SeasonUsers from "../components/SeasonUser/SeasonUsers";
import Nav from "./Nav";
import Logout from "../components/Login/Logout";
import Login from "../components/Login/Login";
import SeasonEvents from "../components/SeasonEvent/SeasonEvents";


const Router = props => {

    const    [openPopup, setOpenPopup] = useState( true);


    return (
        <BrowserRouter>
            <Route
                path="/"
                render={() => (
                    <Nav/>
                )}
            />
            <Switch>
                <Route exact path="/" component={Users}/>
                <Route path="/users" component={Users}/>
                <Route path="/events" component={Events}/>
                <Route path="/seasons" component={Seasons}/>
                <Route path="/seasonUsers" component={SeasonUsers}/>
                <Route path="/seasonEvents" component={SeasonEvents}/>
                <Route path="/login" component={Login}/>
                <Route path="/logout" component= {() => <Logout  openPopup={openPopup} setOpenPopup={setOpenPopup} isOpen={true}/>}/>

            </Switch>
        </BrowserRouter>

    )
}

export default Router;
