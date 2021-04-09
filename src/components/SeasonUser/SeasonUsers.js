import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {CheckBox, CheckBoxOutlineBlank} from "@material-ui/icons";
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
import PeopleIcon from '@material-ui/icons/People';
import ConfirmDialog from "../controls/ConfirmDialog";
import Popup from "../Popup";
import SeasonUserForm from "./SeasonUserForm";

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

    const classes = useStyles();
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [seasonYears, setSeasonYears] = useState([]);
    const [season, setSeason] = useState();
    const [seasonUsers, setSeasonUsers] = useState([]);
    const [recordForEdit, setRecordForEdit] = useState({});
    const [openPopup, setOpenPopup] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});
    const [confirmDialog, setConfirmDialog] = useState({isOpen: false, title: "", subTitle: ""});
    const [filterFn, setFilterFn] = useState({
        fn: items => {
            return items;
        }
    });


    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(seasonUsers, headCells, filterFn);

    useEffect(() => {
        console.log("Seasons::useEffect()");
        retrieveSeasonYears();
        retrieveSeason();
        retrieveSeasonUsers();

    }, [])
    useEffect(() => {
        console.log("Season::useEffect()");
        retrieveSeason();
        retrieveSeasonUsers();

    }, [selectedYear])

    const retrieveSeasonYears = () => {
        SeasonService.getAll().then((response) => {
            let seasons = response.data;
            console.log("seasons:", JSON.stringify(response.data));
            let myTuple = seasons.map(s => {
                return {id: new Date(s.season_date).getFullYear(), title: new Date(s.season_date).getFullYear()}
            })
            console.log("years", JSON.stringify(myTuple));
            setSeasonYears(myTuple);
        }).catch(err => {
            setNotify({isOpen: true, message: "Create new Season failed", type: "error"});
        })
    }
    const retrieveSeason = () => {
        SeasonService.get(selectedYear)
            .then((resp) => {
                setSeason(resp.data);
            }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season failed", type: "error"});
        })
    }

    const retrieveSeasonUsers = () => {
        SeasonUserService.getAll(selectedYear).then(response => {
            setSeasonUsers(response.data);
            console.log("Season Users::", response.data);

        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Season Users failed", type: "error"});

        })
    }


    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }
    const addOrEdit = (item,resetForm) =>{
       if(item.PK) {
           SeasonUserService.update(item).then(response=>{
               resetForm();
               retrieveSeasonUsers();
               setOpenPopup(false);
               setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
           }).catch(err=>{
               console.log("Error=", JSON.stringify(err));
               setNotify({isOpen: true, message: "Update Season User failed", type: "error"});
           })
       }
       else{
           SeasonUserService.create(item).then(response=>{
               console.log("Response=", JSON.stringify(response));
               resetForm();
               retrieveSeasonUsers();
               setOpenPopup(false);
               setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
           }).catch(err=>{
               console.log("Error=", JSON.stringify(err.message));
               setNotify({isOpen: true, message: "Create Season User failed", type: "error"});
           })
       }
    }

    const onDelete = (userName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        SeasonUserService.remove(selectedYear,userName)
            .then(response => {
                retrieveSeasonUsers()
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((e) => {
                setNotify({isOpen: true, message: "Delete failed", type: "error"});
            });

    }
    /**
     * Writes changed form control value into the corresponding key of  the user object
     * @param event the event object
     */
    const handleInputChange = event => {
        console.log("name::", event.target.name);
        console.log("value::", event.target.value);
        setSelectedYear(event.target.value);

    }
    return (
        <>
            <PageHeader elevation={3} icon={< PeopleIcon/>} title="AIGE Members for Season"
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
                        <Grid item xs={5} style={{ padding: 4, marginTop:15}}>
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
                        text="Add new Member"
                        variant="outlined"
                        startIcon={<PersonAddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit({"season_year":selectedYear, is_active:false, fees_paid:false})
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
                                            color="primary"
                                            onClick={() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Control.ActionButton>
                                        <Control.ActionButton color="secondary" onClick={() =>
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
            <Notification notify={notify} setNotify={setNotify}/>
            <Popup title={ recordForEdit.PK ? "Update Season Member": "Add Season Member"} openPopup={openPopup}
                   setOpenPopup={setOpenPopup}>
                <SeasonUserForm seasonUsers={seasonUsers.map(s => s.user_name)} recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
            </Popup>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}>
            </ConfirmDialog>
        </>
    )
}
export default SeasonUsers;
