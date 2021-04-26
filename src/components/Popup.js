import React from "react";
import {Dialog, DialogContent, DialogTitle, makeStyles, Typography} from "@material-ui/core";
import Controls from "../components/controls/Controls"
import CloseIcon from '@material-ui/icons/Close';

const Popup = props => {

    const useStyles = makeStyles(theme => (
        {
            dialogWrapper: {
                padding: theme.spacing(2),
                position: 'absolute',
                top: theme.spacing(5)
            },
            dialogTitle: {
                paddingRight: '0px'
            }
        }))
    const {title, children, openPopup, setOpenPopup} = props;
    const classes = useStyles();


    return (
        <Dialog open={openPopup} maxWidth="md" classes={{paper: classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display: 'flex'}}>
                    <Typography variant="h6" component="div" style={{flexGrow: 1}} color="primary">
                        {title}
                    </Typography>
                    <Controls.ActionButton
                        color="primary"
                        onClick={()=>{setOpenPopup(false)}}>
                        <CloseIcon />
                    </Controls.ActionButton>
                </div>
            </DialogTitle>

            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>

    )
}

export default Popup
