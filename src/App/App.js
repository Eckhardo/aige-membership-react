import './App.css';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import React, {createContext, useState} from "react";
import Router from "./Router";
import UserService from "../services/UserService";
import LoginForm from "../components/Login/LoginForm";
import UserContext from "./context/UserContext";

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


const initialUserState = {
    user_name: "Eckhardo",
    password: "abc"

};
const App = props => {
    const context = React.useContext(UserContext);



    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState();
    const [authenticated, setAuthenticated] = useState(currentUser===null);

    const [openPopup, setOpenPopup] = useState(true);
    const [values, setValues] = useState(initialUserState);
    const [isLoggedIn,setIsLoggedIn] = useState(false)


    const login =  (e) => {
      e.preventDefault();
        UserService.checkLogin(values).then(response => {
            console.log("isLoggedIn",authenticated);
                if (response) {
                    console.log("response");
                    setCurrentUser(response.data);
                    setAuthenticated(true);
                    setOpenPopup(false);

                }
            }
        ).catch(err => {

        })
    }


    return (
        <>

            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                <UserContext.Provider value={{ currentUser: currentUser, setCurrentUser:setCurrentUser}}>
                    <div className={classes.appMain}>
                        {authenticated ? <Router/> : <LoginForm onSubmit={login}
                                                                openPopup={openPopup}
                                                                setOpenPopup={setOpenPopup}
                                                                values={values}
                                                                setValues={setValues}/>}
                    </div>
                </UserContext.Provider>
            </MuiThemeProvider>

        </>
    )
}
export default App;
