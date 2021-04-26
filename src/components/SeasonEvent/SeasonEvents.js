import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    Paper,
    TableBody,
    TableCell,
    TableRow,
    TextField,
    Toolbar
} from "@material-ui/core";
import SeasonService from "../../services/SeasonService";
import UtilityService from "../../util";
import SeasonEventService from "../../services/SeasonEventService";
import useTable from "../useTable";
import Control from "../controls/Controls";
import AddIcon from "@material-ui/icons/LibraryAdd";
import {CheckBox, CheckBoxOutlineBlank, Cloud} from "@material-ui/icons";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../controls/Notification";
import Popup from "../Popup";
import SeasonEventForm from "./SeasonEventForm";
import ConfirmDialog from "../controls/ConfirmDialog";
import UserContext from "../../App/context/UserContext";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;


const headCells = [
    {id: 'event_name', label: 'Event Name'},
    {id: 'season_year', label: "Year"},
    {id: 'meeting_point', label: 'Meeting Point'},
    {id: 'finished', label: 'Finished'},
    {id: 'start_date', label: 'Start'},
    {id: 'end_date', label: 'End'},
    {id: 'comments', label: 'Comments'},
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

}));

const SeasonEvents = props => {
    const userContext = React.useContext(UserContext);

    const isAdmin = userContext.currentUser.is_admin ? false : true;

    const [seasonEvents, setSeasonEvents] = useState([]);
    const [seasonYears, setSeasonYears] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [season, setSeason] = useState();
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    const [recordForEdit, setRecordForEdit] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});


    const classes = useStyles();


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(seasonEvents, headCells, null);


    useEffect(() => {
        console.log("Seasons::useEffect()");
        retrieveSeasonYears();


    }, [])
    useEffect(() => {
        console.log("Season::useEffect()");
        retrieveSeason();


    }, [selectedYear])


    const retrieveSeasonYears = () => {
        SeasonService.getAll().then((response) => {
            setSeasonYears(UtilityService.extractYears(response.data));
            retrieveSeason();
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Seasons failed", type: "error"});
        })
    }
    const retrieveSeason = () => {
        SeasonService.get(selectedYear)
            .then((resp) => {
                setSeason(resp.data);
                retrieveSeasonEvents();
            }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season failed", type: "error"});
        })
    }

    const retrieveSeasonEvents = () => {
        SeasonEventService.getAll(selectedYear).then(response => {
            setSeasonEvents(response.data);
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season Users failed", type: "error"});

        })
    }
    /**
     * Writes changed form control value into the corresponding key of  the user object
     * @param event the event object
     */
    const handleInputChange = event => {
        setSelectedYear(event.target.value);
    }

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }

    const addOrEdit = (item, resetForm) => {
        if (item.PK) {
            SeasonEventService.update(item).then(response => {
                resetForm();
                retrieveSeasonEvents();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                console.log("Error=", JSON.stringify(err));
                setNotify({isOpen: true, message: "Update Season Event failed", type: "error"});
            })
        } else {
            SeasonEventService.create(item).then(response => {
                resetForm();
                retrieveSeasonEvents();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                console.error("Create process failed!", err);
                setNotify({isOpen: true, message: "Create Season Event failed", type: "error"});
            })
        }
    }

    const onDelete = (eventName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        SeasonEventService.remove(selectedYear, eventName)
            .then(response => {
                retrieveSeasonEvents()
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((e) => {
                setNotify({isOpen: true, message: "Delete failed", type: "error"});
            });

    }
    return (
        <>
            <PageHeader elevation={3}  icon={<Cloud color="primary"/>} title="AIGE Events for Season"
                        subTitle={selectedYear}/>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Grid container>
                        <Grid item xs={3}>
                            <Control.Select
                                className={classes.root}
                                label="Select Year"
                                name="selectedYear"
                                value={selectedYear}
                                onChange={handleInputChange}
                                options={seasonYears}
                            />
                        </Grid>
                        <Grid item xs={5} style={{padding: 4, marginTop: 15}}>
                            <TextField
                                id="filled-read-only-input"
                                label="Season Name"
                                value={season && season.season_name}
                                InputProps={{
                                    readOnly: true,
                                }}
                                defaultValue="Season Name"
                                variant="outlined"
                            />
                            <FormControl className={classes.selectControl}>
                                <FormControlLabel
                                    color="primary"
                                    value="start"
                                    control={season && season.is_active === true ?
                                        <Checkbox checkedIcon={checkedIcon} disabled={true} checked={true}/> :
                                        <Checkbox icon={icon} color="primary"
                                                  disabled={true} checked={false}/>}
                                    label="Is active: "
                                    labelPlacement="start"
                                />
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Control.Button
                        className={classes.newButton}
                        text="Add new Season Event"
                        variant="outlined"
                        disabled={isAdmin}
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);

                        }}/>

                </Toolbar>

                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.event_name}>
                                    <TableCell>{item.event_name} </TableCell>
                                    <TableCell>{item.season_year} </TableCell>
                                    <TableCell>{item.meeting_point} </TableCell>
                                    <TableCell>{item.finished === true ? <Checkbox checked={true}/> :
                                        <Checkbox checked={false}/>}</TableCell>


                                    <TableCell>{new Date(item.starting_date).toLocaleDateString('de-DE')}, {item.starting_time} </TableCell>
                                    <TableCell>{new Date(item.ending_date).toLocaleDateString()}, {item.ending_time} </TableCell>
                                    <TableCell> {item.comments} </TableCell>
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
                                                                          onDelete(item.event_name)
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

                </TblContainer>
                <TblPagination/>

                <Notification notify={notify} setNotify={setNotify}/>
                <Popup title={recordForEdit ? "Update Season Event" : "Add Season Event"} openPopup={openPopup}
                       setOpenPopup={setOpenPopup}>
                    <SeasonEventForm recordForEdit={recordForEdit}
                                     addOrEdit={addOrEdit}
                                     selectedYear={selectedYear}/>
                </Popup>
                <ConfirmDialog
                    confirmDialog={confirmDialog}
                    setConfirmDialog={setConfirmDialog}>
                </ConfirmDialog>
            </Paper>
        </>
    )
}
export default SeasonEvents;
