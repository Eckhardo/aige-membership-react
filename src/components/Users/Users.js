import React, {useEffect, useState} from "react";
import PageHeader from "../PageHeader";
import {Cloud, Search} from "@material-ui/icons";
import {InputAdornment, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar} from "@material-ui/core";
import UserService from "../../services/UserService";
import useTable from "../useTable";
import Control from "../controls/Controls";
import Popup from "../Popup";
import UserForm from "./UserForm";
import AddIcon from "@material-ui/icons/Add";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Notification from "../controls/Notification";
import ConfirmDialog from "../controls/ConfirmDialog";
import UserContext from "../../App/context/UserContext";

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
    {id: 'user_name', label: 'User Name'},
    {id: 'first_name', label: 'First Name'},
    {id: 'last_name', label: 'Last Name'},
    {id: 'mobil', label: 'Mobile Phone'},
    {id: 'email', label: 'Email'},
    {id: 'city', label: 'City'},
    {id: 'admission_year', label: 'Admission Year', disableSorting: true},
    {id: 'actions', label: 'Actions', disableSorting: true}

]
const Users = () => {
    const context = React.useContext(UserContext);

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
                    return items.filter(x => x.user_name.toLowerCase().includes(target.value.toLowerCase()))
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
        console.log("Users#useEffect::");
        retrieveUsers();
        console.log("context", JSON.stringify(context));
    }, [])

    /**
     *
     *
     */
    const retrieveUsers = () => {
        UserService.getAll()
            .then(response => {

                setRecords(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const addOrEdit = (user, resetForm) => {

        console.log("addOrEdit::", JSON.stringify(user));

        if (!user.PK) {
             user.admission_year = user.admission_date.getFullYear();
            delete user.admission_date;
            console.log("admission year::", JSON.stringify(user.admission_year));
            UserService.create(user)
                .then(response => {
                    resetForm();
                    retrieveUsers();
                    setOpenPopup(false);
                    setNotify({isOpen: true, message: "Submitted successfully", type: "success"});
                })
                .catch((err) => {
                    setNotify({isOpen: true, message: `Create user failed: ${err}`, type: "error"});
                });
        } else {
            let date = user.admission_date;
            if (date instanceof Date) {
                user.admission_year = date.getFullYear();
            }
            delete user.admission_date;
            UserService.update(user)
                .then(response => {
                    resetForm();
                    retrieveUsers();
                    setOpenPopup(false);
                    setRecordForEdit(null);
                })
                .catch((err) => {
                    setNotify({isOpen: true, message: `Update user failed: ${err}`, type: "error"});
                });
        }
    }


    const onDelete = (userName) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        UserService.remove(userName)
            .then(response => {
                retrieveUsers();
                setNotify({isOpen: true, message: "Deleted successfully", type: "success"});

            })
            .catch((e) => {
                setNotify({isOpen: true, message: `Delete user failed: ${e}`, type: "error"});
            });

    }


    return (
        <>
            <PageHeader
                title={context.currentUser ? "AIGE" : "You are not authenticated:"}
                subTitle={context.currentUser ? "Members" : "Please login"}
                icon={<Cloud color="primary"/>}/>
            {context.currentUser &&
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
                    {context.currentUser.is_admin &&
                    <Control.Button
                        className={classes.newButton}
                        text="Add new"
                        variant="outlined"
                        startIcon={<AddIcon/>}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null)
                        }}/>
                    }
                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => (
                                <TableRow key={item.user_name}>
                                    <TableCell>{item.user_name} </TableCell>
                                    <TableCell>{item.first_name} </TableCell>
                                    <TableCell>{item.last_name} </TableCell>
                                    <TableCell>{item.mobil} </TableCell>

                                    <TableCell>{item.email} </TableCell>
                                    <TableCell>{item.city} </TableCell>
                                    <TableCell>{item.admission_year} </TableCell>
                                    <TableCell>
                                        {(context.currentUser.user_name === item.user_name || context.currentUser.is_admin) &&

                                        <Control.ActionButton
                                            color="primary"
                                            onClick={() => openInPopup(item)}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Control.ActionButton>
                                        }
                                        {context.currentUser.is_admin &&
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
                                        }
                                    </TableCell>

                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            }
            <Popup title="Add User" openPopup={openPopup}
                   setOpenPopup={setOpenPopup}>
                <UserForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
            </Popup>
            <Notification notify={notify} setNotify={setNotify}/>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}>

            </ConfirmDialog>
        </>
    )
}
export default Users;
