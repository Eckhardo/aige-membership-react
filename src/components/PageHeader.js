import React from "react";
import {Card, makeStyles, Paper, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#fdfdff",
    },
    pageHeader: {
        padding: theme.spacing(1),
        display: "flex",
        marginBottom: theme.spacing(2),
        marginTop:  theme.spacing(5),

    },
    pageIcon:{
        display:"inline-block",
        padding: theme.spacing(3),
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
        <Paper elevation={3} square className={classes.root} >
            <div className={classes.pageHeader}>
                <Card className={classes.pageIcon}>
                    {icon}
                </Card>
                <div className={classes.pageTitle}>
                    <Typography
                      variant="h6"
                        component="div">
                        {title}  {subTitle}
                    </Typography>

                </div>
            </div>
        </Paper>
    )

}

export default PageHeader;
