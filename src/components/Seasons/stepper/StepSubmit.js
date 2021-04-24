import React from "react";
import {Grid} from "@material-ui/core";
import Controls from "../../controls/Controls";
import Control from "../../controls/Controls";
import {Form} from "../../useForm";

const StepSubmit = props => {
    const {values, errors, handleSubmit,useStyles} = props;
    const classes = useStyles();
    return (
        <Form onSubmit={handleSubmit}>
            <Grid container className={classes.root} alignItems="center" justify="center">
                <Grid item xs={6}>
                    <Controls.Input
                        label="Season Name"
                        name="season_name"
                        value={values.season_name}
                        InputProps={{
                            readOnly: true,
                        }}
                        type="text"
                        error={errors.season_name}
                    />
                    <Controls.Input
                        label="Season Name"
                        name="season_name"
                        value= {new Date(values.season_date).getFullYear()}
                        InputProps={{
                            readOnly: true,
                        }}
                        type="text"
                        error={errors.season_year}
                    />
                    <Control.Checkbox
                        color="primary"
                        name="is_active"
                        checked={values.is_active}
                        label="Event finished"
                        InputProps={{
                            readOnly: true,
                        }}
                        error={errors.finished}/>
                    <div>
                        <Controls.Button
                            text="Submit"
                            type="submit"
                        />
                    </div>
                </Grid>
            </Grid>
        </Form>
    )
}


export default StepSubmit;
