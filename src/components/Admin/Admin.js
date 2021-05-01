import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {Cloud} from "@material-ui/icons";
import {Grid, makeStyles, Paper} from "@material-ui/core";
import UserContext from "../../App/context/UserContext";
import Controls from "../controls/Controls";
import UserService from "../../services/UserService";
import UserEventService from "../../services/UserEventService";
import SeasonEventService from "../../services/SeasonEventService";
import Notification from "../controls/Notification";


const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiFormControl-root': {
            width: '80%',
            margin: theme.spacing(1),
        }
    }
}))


const Admin = () => {
    const classes = useStyles();

    const context = React.useContext(UserContext);
    const [activeMembers, setActiveMembers] = useState([]);
    const [activeEvents, setActiveEvents] = useState([]);

    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedMember, setSelectedMember] = useState('');
    const [selectedEvent, setSelectedEvent] = useState('');
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});


    /**
     *
     */
    useEffect(() => {
        console.log("Admin#useEffect::");

        retrieveCurrentEvents();
        retrieveCurrentUsers();


    }, [])

    const retrieveCurrentEvents = () => {
        SeasonEventService.getAll(selectedYear).then((response) => {
            let eventNames = retrieveEvents(response.data);
            setActiveEvents(eventNames);
            if (eventNames.length > 0) {
                setSelectedMember(eventNames[0].id);
            }
        }).catch(err => {
            console.error("Retrieve current events failed", err);
            setNotify({isOpen: true, message: `Retrieve current events failed: ${err}`, type: "error"});
        })
    }


    const retrieveCurrentUsers = () => {
        UserEventService.getUsers(selectedYear).then((response) => {
            retrieveMembers(response.data);
        }).catch(err => {
            setNotify({isOpen: true, message: `Retrieve current users failed: ${err}`, type: "error"});
        })
    }

    const retrieveMembers = (userEvents) => {
        UserService.getAll().then((response) => {
            let userNames = retrieveNonDuplicateUsers(response.data, userEvents);
            setActiveMembers(userNames);
            if (userNames.length > 0) {
                setSelectedMember(userNames[0].id);
            }
       }).catch(err => {
            console.log(" ERR ::", JSON.stringify(err));
            setNotify({isOpen: true, message: `Retrieve members failed: ${err}`, type: "error"});
        })
    }

    function retrieveEvents(events) {
        let eventNames = [];
        events.forEach((myEvent, index) => {
            eventNames[index] = {
                event_name: myEvent.event_name
            }
        })
        let myTuple = [];
        if (eventNames.length >= 0) {
            myTuple = eventNames.map(s => {
                return {id: s.event_name, title: s.event_name}
            })
        }
        return myTuple;
    }


    function retrieveNonDuplicateUsers(users, userEvents) {
        let userNames = [];
        users.forEach((user, index) => {
            userNames[index] = {
                user_name: user.user_name
            }
        })
         // splice duplicates
        for (let i = userNames.length - 1; i >= 0; i--) {
            for (let j = 0; j < userEvents.length; j++) {
                if (userNames[i] && (userNames[i].user_name === userEvents[j].user_name)) {
                    userNames.splice(i, 1);
                }
            }
        }
        let myTuple = [];
        if (userNames.length >= 0) {
            myTuple = userNames.map(s => {
                return {id: s.user_name, title: s.user_name}
            })
        }
        return myTuple;
    }

    const handleInputChangeEvent = (e) => {
        setSelectedEvent(e.target.value)
    }
    const handleInputChangeUser = (e) => {
        setSelectedMember(e.target.value)
    }


    const resetForm = () => {
        setActiveMembers([]);
        setActiveEvents([]);
        setSelectedMember(null);
        setSelectedEvent(null);
        setNotify({isOpen: false, message: "", type: ""});
    }
    const handleUserSubmit = (e) => {
        e.preventDefault();
        UserEventService.assembleUsers(selectedYear, selectedMember).then(response => {

            setNotify({isOpen: true, message: "Assemble users succeeded", type: "info"});
        }).catch(err => {
            setNotify({isOpen: true, message: `Assemble users failed: ${err}`, type: "error"});
        })
        console.log("handleUserSubmit::");
    }
    const handleEventSubmit = (e) => {
        console.log("handleEventSubmit::");
        e.preventDefault();
        UserEventService.assembleEvents(selectedYear, selectedEvent).then(response => {
            setNotify({isOpen: true, message: "Assemble events succeeded", type: "info"});
        }).catch(err => {
            setNotify({isOpen: true, message: "Assemble events failed", type: "error"});
        })
    }

    return (
        <>
            <PageHeader
                title="AIGE"
                subTitle=" Admin Page"
                icon={<Cloud color="primary"/>}/>
            <Paper className={classes.pageContent}>
                {


                    context.currentUser &&
                    <form className={classes.root} autoComplete="off">
                        <Grid container>
                            <Grid item sm={3}>
                                <Controls.Select
                                    label="Member"
                                    name="user_name"
                                    disabled={activeMembers.length === 0}
                                    options={activeMembers}
                                    value={selectedMember}
                                    onChange={handleInputChangeUser}
                                />
                            </Grid>
                            <Grid item sm={3}>
                                <Controls.Select
                                    label="Event"
                                    name="event_name"
                                    disabled={activeEvents.length === 0}
                                    options={activeEvents}
                                    value={selectedEvent}
                                    onChange={handleInputChangeEvent}
                                />

                            </Grid>
                        </Grid>
                        <div>
                            <Controls.Button onClick={handleUserSubmit} text="   Save new Users"
                                             disabled={activeMembers.length === 0}
                                             type="submit">

                            </Controls.Button>
                            <Controls.Button onClick={handleEventSubmit}
                                             disabled={activeEvents.length === 0}
                                             text="Save new Events"
                                             type="submit">

                            </Controls.Button>

                            <Controls.Button
                                text="Reset"
                                type="reset"
                                onClick={resetForm}
                            />
                        </div>
                    </form>


                }
                <Notification notify={notify} setNotify={setNotify}/>

            </Paper>


        </>
    )
}
export default Admin;
