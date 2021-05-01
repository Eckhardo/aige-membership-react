import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {Cloud} from "@material-ui/icons";
import {Grid, makeStyles} from "@material-ui/core";
import UserContext from "../../App/context/UserContext";
import Controls from "../controls/Controls";
import UserService from "../../services/UserService";
import EventService from "../../services/EventService";
import UserEventService from "../../services/UserEventService";


const initialAdminState = {
    user_name: "",
    event_name: ""

};

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
    const [selectedMember, setSelectedMember] = useState();
    const [selectedEvent, setSelectedEvent] = useState();
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
        UserEventService.getEvents(2021).then((response) => {

            console.log("current events::", JSON.stringify(response.data));
            retrieveEvents(response.data);

        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve current events failed", type: "error"});
        })
    }


    const retrieveEvents = (userEvents) => {
        EventService.getAll().then((response) => {
            let eventNames = [] = retrieveNonDuplicateEvents(response.data, userEvents);

            console.log("non-duplicate event names ::", JSON.stringify(eventNames));

            let myTuple = eventNames.map(s => {
                return {id: s.event_name, title: s.event_name}
            })
            setActiveEvents(myTuple);
            setSelectedEvent(myTuple[0].id);
            console.log("default event ::", JSON.stringify(myTuple[0].id));


        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve users failed", type: "error"});
        })
    }
    const retrieveCurrentUsers = () => {
        UserEventService.getUsers(2021).then((response) => {
            console.log("current users::", JSON.stringify(response.data));
            retrieveMembers(response.data);
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve current events failed", type: "error"});
        })
    }

    const retrieveMembers = (userEvents) => {

        UserService.getAll().then((response) => {

            let userNames = [] = retrieveNonDuplicateUsers(response.data, userEvents);

            console.log("non-duplicate event names ::", JSON.stringify(userNames));

            let myTuple = userNames.map(s => {
                return {id: s.user_name, title: s.user_name}
            })
            setActiveMembers(myTuple);
            setSelectedMember(myTuple[0].id);
            console.log("default user ::", JSON.stringify(myTuple[0].id));

        }).catch(err => {
            setNotify({isOpen: true, message: "Retreive events failed", type: "error"});
        })
    }

    function retrieveNonDuplicateEvents(events, userEvents) {

        let eventNames = [];
        events.forEach((myEvent, index) => {
            eventNames[index] = {
                event_name: myEvent.event_name
            }
        })
        for (let i = eventNames.length - 1; i >= 0; i--) {
            for (let j = 0; j < userEvents.length; j++) {
                if (eventNames[i] && (eventNames[i].event_name === userEvents[j].event_name)) {
                    eventNames.splice(i, 1);
                }
            }
        }
        return eventNames;
    }


    function retrieveNonDuplicateUsers(users, userEvents) {
        let userNames = [];
        users.forEach((user, index) => {
            userNames[index] = {
                user_name: user.user_name
            }
        })
        for (let i = userNames.length - 1; i >= 0; i--) {
            for (let j = 0; j < userEvents.length; j++) {
                if (userNames[i] && (userNames[i].user_name === userEvents[j].user_name)) {
                    userNames.splice(i, 1);
                }
            }
        }
        return userNames;
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

        }).catch(err => {
            setNotify({isOpen: true, message: "Assemble users failed", type: "error"});
        })
        console.log("handleUserSubmit::");
    }
    const handleEventSubmit = (e) => {
        e.preventDefault();
        console.log("handleEventSubmit::");
    }

    return (
        <>
            <PageHeader
                title="AIGE"
                subTitle=" Admin Page"
                icon={<Cloud color="primary"/>}/>
            {
                context.currentUser &&
                <form className={classes.root} autoComplete="off">
                    <Grid container>
                        <Grid item sm={3}>
                            <Controls.Select
                                label="Member"
                                name="user_name"
                                options={activeMembers}
                                value={selectedMember}
                                onChange={handleInputChangeUser}
                            />
                        </Grid>
                        <Grid item sm={3}>
                            <Controls.Select
                                label="Event"
                                name="event_name"
                                options={activeEvents}
                                value={selectedEvent}
                                onChange={handleInputChangeEvent}
                            />

                        </Grid>
                    </Grid>
                    <div>
                        <Controls.Button onClick={handleUserSubmit} text="   Save new Users"
                                         type="submit">

                        </Controls.Button>
                        <Controls.Button onClick={handleEventSubmit} text="   Save new Events"
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
        </>
    )
}
export default Admin;
