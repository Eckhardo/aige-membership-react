import React from "react";
import {Grid, Paper, Typography} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";


const StepBaseData = props => {

    const {values, setValues, errors, setErrors, handleInputChange, resetForm, validate, useStyles} = props;
    const classes = useStyles();
    return (
        <Paper className={classes.pageContent}>

            <Form>
                <Typography variant="h5"  style={{color: "#999", textAlign: "center"}}>
                    Season Base Data
                </Typography>
                <Grid container className={classes.root} alignItems="center" justify="center">
                    <Grid item xs={6}>
                        <Controls.Input label="Season Name" name="season_name" value={values.season_name}
                                        onChange={handleInputChange} error={errors.season_name}/>
                        <Controls.YearPicker
                            name="season_date"
                            value={values.season_date}
                            label="Season Year"
                            color="primary"
                            onChange={handleInputChange}/>

                        <Controls.Checkbox
                            name="is_active"
                            checked={values.is_active}
                            label="Is active"
                            color="primary"
                            onChange={handleInputChange}/>
                    </Grid>
                </Grid>
            </Form>
        </Paper>

    )
}
export default StepBaseData;
