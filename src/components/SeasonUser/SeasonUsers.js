import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {CheckBox, CheckBoxOutlineBlank, Cloud} from "@material-ui/icons";
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
import Control from "../controls/Controls";
import SeasonService from "../../services/SeasonService";
import Notification from "../controls/Notification";
import SeasonUserService from "../../services/SeasonUserService";

import useTable from "../useTable";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ConfirmDialog from "../controls/ConfirmDialog";
import Popup from "../Popup";
import SeasonUserForm from "./SeasonUserForm";
import UtilityService from "../../util";
import UserContext from "../../App/context/UserContext";

const icon = <CheckBoxOutlineBlank fontSize="small"/>;
const checkedIcon = <CheckBox fontSize="small"/>;


const headCells = [
    {id: 'user_name', label: 'User Name'},
    {id: 'season_year', label: "Year"},
    {id: 'position_role', label: 'Position'},
    {id: 'fees_paid', label: 'Fees paid'},
    {id: 'is_active', label: 'Is active'},
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

const SeasonUsers = () => {
    const userContext = React.useContext(UserContext);

    const isAdmin= !(userContext.currentUser && userContext.currentUser.is_admin);

    const classes = useStyles();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [seasonYears, setSeasonYears] = useState([]);
    const [season, setSeason] = useState({});
    const [seasonUsers, setSeasonUsers] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});



    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(seasonUsers, headCells, null);

    useEffect(() => {
        console.log("Season::useEffect()");
        retrieveSeasonYears();


    }, [selectedYear])

    const retrieveSeasonYears = () => {
        if(seasonYears.length===0) {
            console.log("retrieveSeasonYears");

            SeasonService.getAll().then((response) => {
                let myTuple = UtilityService.extractYears(response.data);
                setSeasonYears(myTuple);
                retrieveSeason();
            }).catch(err => {
                setNotify({isOpen: true, message: `Retrieve seasons failed: ${err}`, type: "error"});
            })
        }
        else{
            retrieveSeason();
        }
    }
    const retrieveSeason = () => {
        console.log("retrieveSeason");

        SeasonService.get(selectedYear)
            .then((resp) => {
                setSeason(resp.data);
                retrieveSeasonUsers();
            }).catch(err => {
            setNotify({isOpen: true, message: `Retrieve season failed: ${err}`, type: "error"});
        })
    }

    const retrieveSeasonUsers = () => {
        console.log("retrieveSeasonUsers");
        SeasonUserService.getAll(selectedYear).then(response => {
            setSeasonUsers(response.data);

        }).catch(err => {
            setNotify({isOpen: true, message: `Retrieve season users failed: ${err}`, type: "error"});

        })
    }


    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }
    const addOrEdit = (item, resetForm) => {
        if (item.PK) {
            SeasonUserService.update(item).then(response => {
                resetForm();
                retrieveSeasonUsers();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                setNotify({isOpen: true, message: `Update season user failed: ${err}`, type: "error"});
            })
        } else {
            SeasonUserService.create(item).then(response => {
                resetForm();
                retrieveSeasonUsers();
                setOpenPopup(false);
                setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
            }).catch(err => {
                setNotify({isOpen: true, message: `Create season user failed: ${err}`, type: "error"});
            })
        }
    }

    const onDelete = (userName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        SeasonUserService.remove(selectedYear, userName)
            .then(response => {
                retrieveSeasonUsers()
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((err) => {
                setNotify({isOpen: true, message: `Delete season user failed: ${err}`, type: "error"});
            });

    }
    /**
     * Writes changed form control value into the corresponding key of  the user object
     * @param event the event object
     */
    const handleInputChange = event => {
        setSelectedYear(event.target.value);

    }
    return (
        <>
            <PageHeader elevation={3} icon={<Cloud color="primary"/>}
                        title={userContext.currentUser ? "AIGE Season Members" : "You are not authenticated:"}
                        subTitle={userContext.currentUser ? selectedYear : "Please login"}
            />
            {userContext.currentUser &&
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
                                label="Season Name"
                                value={season && season.season_name}
                                InputProps={{
                                    readOnly: true
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
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    labelPlacement="start"
                                />
                            </FormControl>
                        </Grid>

                    </Grid>

                    <Control.Button
                        className={classes.newButton}
                        text="Add new Member"
                        variant="outlined"
                        disabled={isAdmin}
                        startIcon={<PersonAddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null)
                        }}/>

                </Toolbar>

                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.user_name}>
                                    <TableCell>{item.user_name} </TableCell>
                                    <TableCell>{item.season_year} </TableCell>
                                    <TableCell>{item.position_role} </TableCell>
                                    <TableCell>{item.fees_paid === true ? <Checkbox checked={true}/> :
                                        <Checkbox checked={false}/>}</TableCell>
                                    <TableCell>{item.is_active === true ? <Checkbox checked={true}/> :
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
                                                                          onDelete(item.user_name)
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
            </Paper>
                    }
            <Notification notify={notify} setNotify={setNotify}/>
            <Popup title={recordForEdit ? "Update Season Member" : "Add Season Member"} openPopup={openPopup}
                   setOpenPopup={setOpenPopup}>
                <SeasonUserForm seasonUsers={seasonUsers.map(s => s.user_name)} recordForEdit={recordForEdit}
                                addOrEdit={addOrEdit}/>
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}>
            </ConfirmDialog>
        </>
    )
}
export default SeasonUsers;
