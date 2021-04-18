import React from "react";
import {Grid, Paper} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";

const StepSubmit = props => {
    const {values, errors, handleSubmit, resetForm, useStyles} = props;
    const classes = useStyles();
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root} alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Paper className={classes.pageContent}>
                        {values.season_name} {errors.season_name}
                    </Paper>
                    <Paper className={classes.pageContent}>
                        {new Date(values.season_date).getFullYear()}
                    </Paper>
                    <Paper className={classes.pageContent}>
                        {values.is_active}
                    </Paper>
                    <Paper className={classes.pageContent}>
                        {
                            values.members.map(member => (
                                <div key={member}>{member}</div>
                            ))
                        }
                    </Paper>
                    <Paper className={classes.pageContent}>
                        {
                            values.events.map(ev => (
                                <div key={ev}>{ev}</div>
                            ))
                        }
                    </Paper>
                    <div>
                        <Controls.Button
                            text="Submit"
                            type="submit"
                        />
                        <Controls.Button
                            text="Reset"
                            type="reset"
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}


export default StepSubmit;
