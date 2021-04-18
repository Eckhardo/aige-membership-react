import React from "react";
import { useEffect, useState} from "react";
import {Grid, Paper} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";
import _ from "underscore";
import EventService from "../../../services/EventService";

const StepEvents = props => {

    const {values, setValues, errors, handleInputChange, resetForm, validate, useStyles} = props;
    const [events, setEvents] = useState([])
    const classes = useStyles();


    useEffect(() => {
        console.log("StepEvents#useEffect::");
        getEvents();
    }, []);

    const getEvents = () => {
        EventService.getAll().then(response => {
            console.log("events", response.data.map(ev => ev.event_name));
            setEvents(response.data.map(ev => ev.event_name));
        }).catch(e => {
            console.log(e);
        })

    }

    return (

            <Form>
                <Grid container className={classes.root} alignItems="center" justify="center">
                    <Grid item xs={6}>
                        <Controls.SelectMultipleChip
                            name="events"
                            value={values.events}
                            label="Possible Events"
                            InputProps={{
                                readOnly: true,
                            }}
                            color="primary"
                            onChange={handleInputChange}
                            options={events}
                            error={errors.events}
                        >
                        </Controls.SelectMultipleChip>
                    </Grid>
                </Grid>
            </Form>

    )
}
export default StepEvents;
