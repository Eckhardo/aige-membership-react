import React, {useEffect, useState} from "react";
import {Form, useForm} from "../useForm";
import {Grid} from "@material-ui/core";
import Controls from "../controls/Controls";
import Control from "../controls/Controls";
import Notification from "../controls/Notification";
import _ from "underscore";
import EventService from "../../services/EventService";
import DatePicker from "../controls/DatePicker";
import TextField from "@material-ui/core/TextField";


const initialSeasonEventState = {

    PK: "",
    SK: "",
    season_year: new Date().getFullYear(),
    event_name: "",
    meeting_point: "",
    finished: false,
    starting_date: new Date(),
    starting_time:"08:00",
    ending_date: new Date(),
    ending_time:"12:00",
    comments:""
};


const SeasonEventForm = props => {
    const {selectedYear, addOrEdit, recordForEdit} = props;

    const [activeEvents, setActiveEvents] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});



    /**
     *
     */
    useEffect(() => {
        console.log("SeasonEventForm#useEffect::");
        if (recordForEdit !=null) {
            setValues({...recordForEdit});
        }

        console.log("SeasonEventForm:values:", JSON.stringify(values));
        retrieveActiveEvents();

    }, [recordForEdit])
    /**
     *
     * @param fieldValues
     * @returns {boolean}
     */
    const validate = (fieldValues = values) => {
        console.log("validate::", fieldValues);
        let temp = {...errors};
        if ('season_year' in fieldValues) {
            temp.season_year = fieldValues.season_year ? "" : "This field is required";
        }
        if ('event_name' in fieldValues) {
            temp.event_name = fieldValues.event_name ? "" : "This field is required";
        }
        if ('starting_date' in fieldValues) {
            temp.starting_date = fieldValues.starting_date ? "" : "This field is required";
        }
        if ('starting_time' in fieldValues) {
            temp.starting_time = fieldValues.starting_time ? "" : "This field is required";
        }
        if ('ending_date' in fieldValues) {
            temp.ending_date = fieldValues.ending_date ? "" : "This field is required";
        }
        if ('ending_time' in fieldValues) {
            temp.ending_time = fieldValues.ending_time ? "" : "This field is required";
        }
        if ('meeting_point' in fieldValues) {
            temp.meeting_point = fieldValues.meeting_point ? "" : "This field is required";
        }
        setErrors({
            ...temp
        });
        if (fieldValues === values) {
            return Object.values(temp).every(val => val === "");
        }
    }
    // Build Form from template
    const {values, setValues, errors, setErrors, handleInputChange, resetForm}
        = useForm(initialSeasonEventState, true, validate);

   console.log("values:seasonEventForm::", JSON.stringify(values));

    const retrieveActiveEvents = () => {
        EventService.getAll().then((response) => {
            let events = response.data;

            console.log("items::", JSON.stringify(events));
            let myTuple = events.map(s => {
                return {id: s.event_name, title: s.event_name}
            })
            setActiveEvents(myTuple);
        }).catch(err => {
            setNotify({isOpen: true, message: "Retrieve Event failed", type: "error"});
        })
    }

    const handleSubmitForm = (e) => {
        console.log("Form#submit::", JSON.stringify(values));
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
        ;
    }
    return (
        <Form onSubmit={handleSubmitForm}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        label="Season Year"
                        name="season_year"
                        value={selectedYear}
                        InputProps={{
                            readOnly: true,
                        }}
                        type="text"
                        onChange={handleInputChange}/>
                    {values.PK ?
                        <Controls.Input
                            label="Event  Name"
                            name="event_name"
                            value={values.event_name}
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={handleInputChange}/>
                        : <Controls.Select
                            label="Event"
                            name="event_name"
                            options={activeEvents}
                            value={values.event_name}
                            onChange={handleInputChange}
                            error={errors.event_name}

                        />}

                    <Controls.Input
                        label="Meeting Point"
                        name="meeting_point"
                        value={values.meeting_point}
                        onChange={handleInputChange}
                        error={errors.meeting_point}
                    />

                    <Controls.Input
                        label="Comments"
                        name="comments"
                        multiline
                        rows={3}
                        value={values.comments}
                        onChange={handleInputChange}/>

                    <Control.Checkbox
                        color="primary"
                        name="finished"
                        checked={values.finished}
                        label="Event finished"
                        onChange={handleInputChange}
                        error={errors.finished}/>

                </Grid>

                <Grid item sm={6}>
                        <DatePicker
                            label="Start Date"
                            name="starting_date"
                            value={values.starting_date}

                            color="primary"
                            onChange={handleInputChange}
                            error={errors.starting_date}/>
                        <TextField
                            variant="outlined"
                            label="Start Time"
                            type="time"
                            color="primary"
                            name="starting_time"
                            value={values.starting_time}
                            defaultValue="08:00"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            onChange={handleInputChange}
                            error={errors.starting_time}/>


                    <DatePicker
                        label="End Date"
                        name="ending_date"
                        value={values.ending_date}
                        color="primary"
                        onChange={handleInputChange}
                        error={errors.ending_date}/>
                    <TextField
                        variant="outlined"
                        label="End Time"
                        type="time"
                        color="primary"
                        name="ending_time"
                        value={values.ending_time}
                        defaultValue="12:00"
                         InputLabelProps={{
                            shrink: true,
                        }}

                        onChange={handleInputChange}
                        error={errors.ending_time}/>




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
            <Notification notify={notify} setNotify={setNotify}/>
        </Form>

    )
}
export default SeasonEventForm;
