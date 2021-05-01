import React, {useContext, useEffect, useState} from "react";
import UserContext from "../../App/context/UserContext";
import {
    Checkbox,
    Grid,
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Toolbar,
    Typography
} from "@material-ui/core";
import useTable from "../useTable";
import PageHeader from "../PageHeader";
import Notification from "../controls/Notification";
import Popup from "../Popup";

import ConfirmDialog from "../controls/ConfirmDialog";
import UserEventService from "../../services/UserEventService";
import SeasonService from "../../services/SeasonService";
import SeasonEventService from "../../services/SeasonEventService";
import UtilityService from "../../util";
import Control from "../controls/Controls";
import PersonAddIcon from "@material-ui/icons/LibraryAdd";
import {CheckBox, CheckBoxOutlineBlank, Cloud} from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

import UserEventForm from "./UserEventForm";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;
const headCells = [
    {id: 'user_name', label: 'User Name'},
    {id: 'registered', label: 'Registered'},
    {id: 'took_part', label: 'Took part'},
    {id: 'actions', label: 'Actions', disableSorting: true}

]

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(5)

    },
    formControl: {
        minWidth: 120,
    },
    selectControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }

}))


const UserEvents = props => {

    const userContext = useContext(UserContext);

    const isAdmin= userContext.currentUser && userContext.currentUser.is_admin ? false:true;
    const classes = useStyles();
    const [userEvents, setUserEvents] = useState([]);
    const [seasonYears, setSeasonYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [selectedEvent, setSelectedEvent] = useState('');
    const [events, setEvents] = useState([]);
    const [season, setSeason] = useState();

    const [recordForEdit, setRecordForEdit] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});

    useEffect(() => {
        console.log("selectedYear::useEffect");
        retrieveSeasonYears();
    }, [selectedYear]);


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(userEvents, headCells, null);


    const retrieveSeasonYears = () => {
        if (seasonYears.length === 0) {
            SeasonService.getAll().then((response) => {
                let myTuple = UtilityService.extractYears(response.data);
                setSeasonYears(myTuple);
                retrieveSeason();
            }).catch(err => {
                setNotify({isOpen: true, message: "Retrieve Seasons failed", type: "error"});
            })
        } else {
            retrieveSeason();
        }
    }

    const retrieveSeason = () => {

        SeasonService.get(selectedYear)
            .then((resp) => {
                setSeason(resp.data);
                retrieveEvents();
            }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season failed", type: "error"});
        })
    }


    const retrieveEvents = () => {
        SeasonEventService.getAll(selectedYear).then(response => {
            setEvents(response.data);

            let myTuple = UtilityService.extractEvents(response.data);
            if (myTuple && myTuple.length > 0) {
                if (selectedEvent !== '') {
                    setSelectedEvent(myTuple[0].id);
                }
            }
            retrieveUserEvents(myTuple[0].id);
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve User Events failed", type: "error"});

        })
    }

    const retrieveUserEvents = (myEvent) => {
        UserEventService.getAll(selectedYear,myEvent).then(response => {
            setUserEvents(response.data);
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve User Events failed", type: "error"});

        })
    }

    const addOrEdit = (item, resetForm) => {
        if (item.PK) {
            UserEventService.update(item).then(response => {
                resetForm();
                retrieveUserEvents();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                console.log("Error=", JSON.stringify(err));
                setNotify({isOpen: true, message: "Update User Event failed", type: "error"});
            })
        } else {
            UserEventService.create(item).then(response => {
                console.log("Response=", JSON.stringify(response));
                resetForm();
                retrieveUserEvents();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                console.log("Error=", JSON.stringify(err.message));
                setNotify({isOpen: true, message: "Create  User Event failed", type: "error"});
                setOpenPopup(false);
            })
        }
    }
    const handleYearChange = event => {
        setSelectedYear(event.target.value);

    }
    const handleEventChange = event => {
        setSelectedEvent(event.target.value);
        retrieveUserEvents(event.target.value);
    }
    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const onDelete = (eventName, userName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        SeasonEventService.remove(selectedYear, eventName, userName)
            .then(response => {
                retrieveUserEvents();
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((e) => {
                setNotify({isOpen: true, message: "Delete failed", type: "error"});
            });

    }
    return (
        <>
            <PageHeader elevation={3} icon={<Cloud color="primary"/>} title="AIGE User Events for Season"
                        subTitle={selectedYear}/>
            {userContext.currentUser &&

            <Paper className={classes.pageContent}>


                <Toolbar>
                    <Grid container>
                        <Grid item xs={2}>
                            <Control.Select
                                className={classes.root}
                                label="Select Year"
                                name="selectedYear"
                                value={selectedYear}
                                onChange={handleYearChange}
                                options={seasonYears}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <Control.Select
                                className={classes.root}
                                label="Select Event"
                                name="selectedEvent"
                                value={selectedEvent}
                                onChange={handleEventChange}
                                options={UtilityService.extractEvents(events)}
                            />
                        </Grid>
                        <Grid item xs={6} style={{padding: 4, marginTop: 15}}>
                            <TextField
                                label="Season Name"
                                value={season && season.season_name}
                                InputProps={{
                                    readOnly: true
                                }}
                                defaultValue="Season Name"
                                variant="outlined"
                            />

                        </Grid>

                    </Grid>

                    <Control.Button
                        className={classes.newButton}
                        text="Add User Event"
                        variant="outlined"
                        disabled
                        startIcon={<PersonAddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null)
                        }}/>

                </Toolbar>

                <TblContainer>

                    <TblHead/>
                    { recordsAfterPagingAndSorting().length>0  ?
                    <TableBody>
                        {
                             recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.user_name}>
                                    <TableCell>{item.user_name} </TableCell>
                                    <TableCell>{item.registered === true ? <Checkbox checked={true}/> :
                                        <Checkbox checked={false}/>}</TableCell>
                                    <TableCell>{item.took_part === true ? <Checkbox checked={true}/> :
                                        <Checkbox checked={false}/>}</TableCell>

                                    <TableCell>
                                        <Control.ActionButton
                                            color={!isAdmin ? "primary" : "default"}
                                            disabled={isAdmin}
                                            onClick={() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Control.ActionButton>
                                        <Control.ActionButton color={!isAdmin ? "secondary" : "default"}
                                                              disabled={isAdmin}
                                                              onClick={() =>
                                                                  setConfirmDialog({
                                                                      isOpen: true,
                                                                      title: "Sure to delete this item?",
                                                                      subTitle: "You can undo this operation",

                                                                      onConfirm: () => {
                                                                          onDelete(item.event_name, item.user_name)
                                                                      }
                                                                  })}
                                        >
                                            <CloseIcon fontSize="small"/>
                                        </Control.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                    :
                    <TableBody>
                        <Typography component={'div'} className={classes.pageContent}>No result found</Typography>
                    </TableBody>
                }
                </TblContainer>
                <TblPagination/>

            </Paper>
            }
            <Notification notify={notify} setNotify={setNotify}/>
            <Popup title={recordForEdit ? "Update User Event" : "Add User Event"} openPopup={openPopup}
                   setOpenPopup={setOpenPopup}>
                <UserEventForm currentUsers={userEvents.map(s => s.user_name)} recordForEdit={recordForEdit}
                               addOrEdit={addOrEdit}/>
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}>
            </ConfirmDialog>
        </>

    )

}
export default UserEvents;
