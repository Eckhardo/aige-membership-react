import {React, useEffect, useState} from "react";
import {Grid, makeStyles, Paper, Typography} from "@material-ui/core";
import Controls from "../../controls/Controls";
import {Form} from "../../useForm";
import _ from "underscore";
import EventService from "../../../services/EventService";

const StepEvents = props => {

    const {values, setValues, errors, handleInputChange, resetForm, validate,useStyles} = props;
    const [events, setEvents] = useState([])
    const classes = useStyles();


    useEffect(() => {
        console.log("StepEvents#useEffect::");
        getEvents();
    }, []);

    const getEvents = () => {
        EventService.getAll().then(response => {
            let myEvents = response.data;
            const nonActiveEvents = _.intersection(myEvents.map((theEvent) => {
                return theEvent.event_name
            }), values.events);
            console.log("nonActiveEvents::", JSON.stringify(nonActiveEvents));

            const items = myEvents.filter(event => !nonActiveEvents.includes(event.event_name));
            console.log("items::", JSON.stringify(items));

            setEvents(items);
        }).catch(e => {
            console.log(e);
        })

    }

    return (
        <Paper className={classes.pageContent}>

        <Form>
            <Typography variant="h5" style={{color: "#999", textAlign: "center"}}>
                Select Events
            </Typography>
            <Grid container className={classes.root} alignItems="center" justify="center">
                <Grid item xs={6}>
                <Controls.Input label="Season Name" name="season_name" value={values.season_name}
                                    onChange={handleInputChange} error={errors.season_name}/>
                    <Controls.SelectMultipleCheckbox
                        name="events"
                        value={values.events}
                        label="Events"
                        color="primary"
                        onChange={handleInputChange}
                        options={events.map(member => (member.event_name))}
                        error={errors.events}

                    >
                    </Controls.SelectMultipleCheckbox>
                </Grid>
            </Grid>
        </Form>
        </Paper>
    )
}
export default StepEvents;
