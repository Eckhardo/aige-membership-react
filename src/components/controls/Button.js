import React from "react";
import {Button as MuiButton, makeStyles} from "@material-ui/core";


const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(0.5)
    },
    label: {
        textTransform: "none"
    }
}))
// ..other can be used to set properties like 'type=submit',
const Button = props => {
    const {text, variant, color, size, onClick, ...other} = props;
    const classes = useStyles();

    return (
        <MuiButton variant={variant || "contained"}
                   color={color || "primary"}
                   size={size || "large"}
                   onClick={onClick}
                   {...other}
                   classes={{root: classes.root, label: classes.label}}>
            {text}
        </MuiButton>)

}

export default Button
