import React from "react";
import {withStyles} from "@material-ui/core";

const styles ={
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: 'dodgerblue',
    }
}
const SideMenu = props => {

    const {classes}= props;

    return (
        <div className={classes.sideMenu}>
            Complete MUI App
        </div>
    )
}

export default withStyles(styles) (SideMenu);
