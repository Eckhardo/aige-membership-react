import React from "react";
import {Card, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#fdfdff",
    },
    pageHeader: {
        padding: theme.spacing(2),
        display: "flex",
        marginBottom: theme.spacing(2),
        marginTop:  theme.spacing(2),

    },
    pageIcon:{
        display:"inline-block",
        padding: theme.spacing(2),
        color:"#3c44b1"
    },
    pageTitle:{
        padding:theme.spacing(2),
        '& .MuiTypography-subtitle1':{
            opacity: '0.6'
        }
    }
}))
const PageHeader = (props) => {

    const {icon, title, subTitle} = props;


    const classes = useStyles();
    return (
        <Paper elevation={0} square className={classes.root}>
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                        variant="h6"
                        component="div">
                        {title}
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        component="div">
                        {subTitle}
                    </Typography>
                </div>
            </div>
        </Paper>
    )

}

export default PageHeader;
