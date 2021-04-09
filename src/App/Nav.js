import React from "react";
import {AppBar, Tab, Tabs} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useHistory} from "react-router";


const routes = ["/users", "/events", "/seasons", "/seasonUsers", "/seasonEvents", "/login"];


const Nav = props =>{


    const history = useHistory();
    
    
    return (
        <AppBar>
            <Tabs
                value={
                    history.location.pathname !== "/"
                        ? history.location.pathname
                        : false
                }
            >
                {console.log(history.location.pathname)}
                <Tab
                    value={routes[0]}
                    label="Members"
                    component={Link}
                    to={routes[0]}
                />
                <Tab
                    value={routes[1]}
                    label="Events"
                    component={Link}
                    to={routes[1]}
                />
                <Tab
                    value={routes[2]}
                    label="Seasons"
                    component={Link}
                    to={routes[2]}
                />
                <Tab
                    value={routes[3]}
                    label="Season Members"
                    component={Link}
                    to={routes[3]}
                />
                <Tab
                    value={routes[4]}
                    label="Season Events"
                    component={Link}
                    to={routes[4]}
                />

                <Tab
                    value={routes[5]}
                    label="Login/Logout"
                    component={Link}
                    to={routes[5]}
                />
            </Tabs>
        </AppBar>
    )

}
export default Nav;
