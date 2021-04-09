import './App.css';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import React from "react";
import Router from "./Router";


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


const App = props => {
    const classes = useStyles();

    return (
        <>
            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                <div className={classes.appMain}>
                    <Router/>
                </div>
            </MuiThemeProvider>
        </>
    )
}

export default App;
