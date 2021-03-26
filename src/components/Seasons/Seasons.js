import React, {useEffect, useState} from "react";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import {PeopleOutlined, Search} from "@material-ui/icons";
import useTable from "../useTable";
import SeasonService from "../../services/SeasonService";
import PageHeader from "../PageHeader";
import Control from "../controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Checkbox from "../controls/Checkbox";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../Popup";
import SeasonStepsForm from "./SeasonStepsForm";

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
    {id: 'season_name', label: 'Seasons Name'},
    {id: 'season_year', label: 'Season year'},
    {id: 'is_active', label: 'Is active'},
    {id: 'members', label: 'Members'},
    {id: 'events', label: 'Events'}
]

const Seasons = () => {

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
    const {TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting}
        = useTable(records, headCells, filterFn);

    /**
     *
     */
    useEffect(() => {
        console.log("Seasons#useEffect::");
        retrieveSeasons();
    }, [])


    const retrieveSeasons = () => {
        SeasonService.getAll().then(response => {
            setRecords(response.data);
        }).catch(e => {
            console.log(e);
        })
    }
    const onDelete = item =>{
        SeasonService.remove(item.season_year).then( response =>{
            retrieveSeasons();
            setNotify({isOpen: true, message: "Deleted successfully", type: "success"});


        }).catch( e =>{
            setNotify({isOpen: true, message: "Deletion of Season failed", type: "error"});

        })
    }

    const addOrEdit = (item, resetForm) => {
        if (item.PK) {
            SeasonService.update(item).then(response => {
                    resetForm();
                    setOpenPopup(false);
                    retrieveSeasons();
                    setNotify({isOpen: true, message: "Updated successfully", type: "success"});

                }
            ).catch(e => {
                    setNotify({isOpen: true, message: "Update new Season failed", type: "error"});
                    console.log(e);
                }
            )
        } else {
            SeasonService.create(item).then(response => {
                    resetForm();
                    setOpenPopup(false);
                    retrieveSeasons();
                    setNotify({isOpen: true, message: "Submitted successfully", type: "success"});

                }
            ).catch(e => {
                    setNotify({isOpen: true, message: "Create new Season failed", type: "error"});
                    console.log(e);
                }
            )

        }
    }
    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "") {
                    return items;
                } else {
                    return items.filter(item => item.season_name.toLowerCase().includes(target.value.toLowerCase()));
                }
            }
        })
    }

    const openInPopup = (item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }


    return (
        <>
            <PageHeader elevation={3} icon={<PeopleOutlined/>} title="Season list" subTitle="AIGE seasons"/>
            <Paper className={classes.pageContent}>
                <Toolbar>
                    <Control.Input
                        className={classes.searchInput}
                        label="Search Users"
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
                                <TableRow key={item.season_year}>
                                    <TableCell>{item.season_name}</TableCell>
                                    <TableCell>{item.season_year}</TableCell>
                                    <TableCell>{item.is_active === true ? <Checkbox checked={true}/> :
                                        <Checkbox checked={false}/>}</TableCell>
                                    <TableCell>
                                    {item.members.map( member => (
                                       <div key={member}> {member}</div>
                                    ))}
                                    </TableCell>
                                    <TableCell>
                                    {item.events.map( ev => (
                                        <div key={ev}> {ev}</div>
                                    ))}
                                </TableCell>
                                    <TableCell>
                                        <Control.ActionButton
                                            color="primary"
                                            onClick={() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Control.ActionButton>
                                        <Control.ActionButton color="secondary" onClick={() =>
                                            setConfirmDialog({
                                                isOpen: true,
                                                title: "Are you sure to delete this item?",
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

            </Paper>
            <Popup title="Add Season" openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <SeasonStepsForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /></Popup>

        </>

    )
}

export default Seasons;