import './App.css';
import {createMuiTheme, makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import {CssBaseline} from "@material-ui/core";
import React, {useState} from "react";
import Router from "./Router";
import UserService from "../services/UserService";
import LoginForm from "../components/Login/LoginForm";
import UserContext from "./context/UserContext";
import SimplePopup from "../components/SimplePopup";
import Popup from "../components/Popup";

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
    const limit = 3;
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState();
    const [authenticated, setAuthenticated] = useState(currentUser === null);
    const [counter, setCounter] = useState(0);
    const [openPopup, setOpenPopup] = useState(true);
     const [values, setValues] = useState(initialUserState);

    const login = (e) => {
        e.preventDefault();
        UserService.checkLogin(values).then(response => {
                console.log("isLoggedIn", authenticated);
                if (response) {
                    setCurrentUser(response.data);
                    setAuthenticated(true);
                    setOpenPopup(false);

                } else {
                    if (counter >= limit) {
                        setOpenPopup(false);
                    }
                }
            }
        ).catch(err => {
            console.log("ERROR in Login");
            setCounter(prevState => prevState + 1);
        })
    }


    return (
        <>

            <MuiThemeProvider theme={muiTheme}>
                <CssBaseline/>
                <UserContext.Provider value={{currentUser: currentUser, setCurrentUser: setCurrentUser}}>
                    {counter <= limit &&
                    <div className={classes.appMain}>
                        {authenticated ? <Router/> : <LoginForm onSubmit={login}
                                                                openPopup={openPopup}
                                                                setOpenPopup={setOpenPopup}
                                                                counter={counter}
                                                                values={values}
                                                                setValues={setValues}/>}
                    </div>
                    }
                    {counter === limit &&
                    <div>
                        <Popup title="You tried more than 2 times: Isch over!" openPopup={openPopup}  setOpenPopup={setOpenPopup}
                        />

                    </div>
                    }
                </UserContext.Provider>
            </MuiThemeProvider>

        </>
    )
}
export default App;
