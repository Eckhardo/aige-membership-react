import './App.css';

import {AppBar, createMuiTheme, CssBaseline, makeStyles, MuiThemeProvider, Tab, Tabs} from "@material-ui/core";
import React from "react";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Users from "../components/Users/Users";
import Events from "../components/Events/Events"
import Seasons from "../components/Seasons/Seasons";
import Season from "../components/Season/Season";

const useStyles = makeStyles(theme => ({
    appMain: {
        paddingLeft: '100px',
        width: '75%',
        marginBottom: theme.spacing(2)

    }

}))

const muiTheme = createMuiTheme({
    typography: {
        h2: {
            fontSize: 18,
            alignContent: "center",
        },
        h3: {
            fontSize: 34,
            alignContent: "inherit",
        }
    },
    palette: {
        primary: {
            main: "#006400",
            light: '#98fb98'
        },
        secondary: {
            main: "#4682b4",
            light: '#add8d6'
        },
        background: {
            default: "#f4f5fd"
        },
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                body: {
                    backgroundColor: "#f3f4fd",
                    color: "green",
                },
            },
        },
    }
})

function App(props) {
    const classes = useStyles();
    const routes = ["/users", "/events", "/seasons", "/season"];
    return (
        <>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                <div className={classes.appMain}>
                    <BrowserRouter>
                        <Route
                            path="/"
                            render={(history) => (
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
                                            label="Users"
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
                                            label="Current Season"
                                            component={Link}
                                            to={routes[3]}
                                        />
                                    </Tabs>
                                </AppBar>
                            )}
                        />

                        <Switch>
                            <Route path="/users" component={Users}/>
                            <Route path="/events" component={Events}/>
                            <Route path="/seasons" component={Seasons}/>
                            <Route path="/season" component={Season}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider>
        </>
    )
}

export default App;
