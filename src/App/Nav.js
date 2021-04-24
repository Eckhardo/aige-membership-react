import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";
import UserContext from "./context/UserContext";

const routes = ["/users", "/events", "/seasons", "/seasonUsers", "/seasonEvents", "/userEvents","/login", "/logout"];


const Nav = props => {
    const context = React.useContext(UserContext);

    const history = useHistory();


    return (
        <AppBar>
            <Tabs
                value={
                    history.location.pathname !== "/"
                        ? history.location.pathname : false
                }
            >
                {console.log(history.location.pathname)}

                <Tab
                    value={routes[0]}
                    label="Members"
                    component={Link}
                    to={routes[0]}
                />

                {context.currentUser &&
                <Tab
                    value={routes[1]}
                    label="Events"
                    component={Link}
                    to={routes[1]}
                />}
                {context.currentUser &&
                <Tab
                    value={routes[2]}
                    label="Seasons"
                    component={Link}
                    to={routes[2]}
                />}
                {context.currentUser &&
                <Tab
                    value={routes[3]}
                    label="Season Members"
                    component={Link}
                    to={routes[3]}
                />}
                {context.currentUser &&
                <Tab
                    value={routes[4]}
                    label="Season Events"
                    component={Link}
                    to={routes[4]}
                />}
                {context.currentUser &&
                <Tab
                    value={routes[5]}
                    label="User Events"
                    component={Link}
                    to={routes[5]}
                />}
                {!context.currentUser &&
                <Tab
                    value={routes[6]}
                    label="Login"
                    component={Link}
                    to={routes[6]}
                />
                }
                {context.currentUser &&
                <Tab
                    value={routes[7]}
                    label="Logout"
                    component={Link}
                    to={routes[7]}
                />
                }
            </Tabs>
        </AppBar>
    )
}
export default Nav;
