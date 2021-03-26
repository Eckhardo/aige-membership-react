import React, {useEffect, useState} from "react";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import useTable from "../useTable";
import EventService from "../../services/EventService";
import PageHeader from "../PageHeader";
import {PeopleOutlined, Search} from "@material-ui/icons";
import Control from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../Popup";
import EventForm from "./EventForm";
import Notification from "../controls/Notification";
import ConfirmDialog from "../controls/ConfirmDialog";

const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(5)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: 'event_name', label: 'Event Name'},
    {id: 'event_short', label: 'Event Key'},
    {id: 'event_comment', label: 'Comment'},
    {id: 'actions', label: 'Actions', disableSorting: true}

]


const Events = props => {

    const classes = useStyles();
    const [records, setRecords] = useState([]);
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
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.event_name.toLowerCase().includes(target.value.toLowerCase()))
            }
        })
    }

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }
    /**
     *
     */
    useEffect(() => {
        console.log("Events#useEffect::");
        retrieveEvents();
    }, [])

    /**
     *
     *
     */
    const retrieveEvents = () => {
        EventService.getAll()
            .then(response => {
                console.log("# of items::", JSON.stringify(response.data.length));
                setRecords(response.data);
                console.log("setRecords::");
            })
            .catch(e => {
                console.log(e);
            });
    };


    const addOrEdit = (theEvent, resetForm) => {

        console.log("addOrEdit::", JSON.stringify(theEvent));
        if (!theEvent.PK) {

            EventService.create(theEvent)
                .then(response => {
                    resetForm();
                    retrieveEvents();
                    setOpenPopup(false);
                    setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
                })
                .catch((e) => {
                    setNotify({isOpen: true, message: "Create new User failed", type: "error"});
                });
        } else {
            EventService.update(theEvent)
                .then(response => {
                    resetForm();
                    retrieveEvents();
                    setOpenPopup(false);
                    setRecordForEdit(null);
                })
                .catch((e) => {
                    setNotify({isOpen: true, message: "Update failed", type: "error"});
                });
        }
    }


    const onDelete = (eventName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        EventService.remove(eventName)
            .then(response => {
                retrieveEvents()
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((e) => {
                setNotify({isOpen: true, message: "Delete failed", type: "error"});
            });

    }

    return (
        <>
            <PageHeader
                title="Event list"
                subTitle="AIGE Events"
                icon={<PeopleOutlined/>}/>
            <Paper className={classes.pageContent}>

                <Toolbar>
                    <Control.Input
                        className={classes.searchInput}
                        label="Search Events"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            ),
                        }}
                        onChange={handleSearch}
                    >
                    </Control.Input>
                    <Control.Button
                        className={classes.newButton}
                        text="Add new"
                        variant="outlined"
                        startIcon={<AddIcon/>}
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
                                <TableRow key={item.SK}>
                                    <TableCell>{item.event_name} </TableCell>
                                    <TableCell>{item.event_short} </TableCell>
                                    <TableCell>{item.comments} </TableCell>

                                    <TableCell>
                                        <Control.ActionButton
                                            color="primary"
                                            onClick={() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Control.ActionButton>
                                        <Control.ActionButton color= "secondary" onClick={() =>
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: "Are you sure to delete this item?",
                                                subTitle: "You can undo this operation",
                                                onConfirm: () => {
                                                    onDelete(item.SK)
                                                }
                                            })}
                                        >
                                            <CloseIcon fontSize="small"/>
                                        </Control.ActionButton></TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup title="Add User" openPopup={openPopup}
                   setOpenPopup={setOpenPopup}>
                <EventForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
            </Popup>
            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}>

            </ConfirmDialog>
        </>
    )


}

export default Events;
