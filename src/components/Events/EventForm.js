import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";

const initialUserState = {

    PK: "",
    SK: "",
    event_name: "Anangeln",
    event_short: "A-1",
    comments: "",

};


const EventForm = (props) => {
    const {recordForEdit, addOrEdit} = props;

    /**
     *
     */
    useEffect(() => {
        console.log("EventForm#useEffect::");
        if (recordForEdit != null) {
            setValues({...recordForEdit});
        }
    }, [recordForEdit])


    /**
     *
     * @param fieldValues
     * @returns {boolean}
     */
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('event_name' in fieldValues) {
            temp.event_name = fieldValues.event_name ? "" : "This field is required";
        }
        if ('event_short' in fieldValues) {
            temp.event_short = fieldValues.event_short ? "" : "This field is required";
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
        = useForm(initialUserState, true, validate);

    /**
     *
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        } ;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input label="Event Name" name="event_name" value={values.event_name}
                                    onChange={handleInputChange} error={errors.event_name}/>
                    <Controls.Input label="Event Key" name="event_short" value={values.event_short}
                                    onChange={handleInputChange} error={errors.event_short}/>
                    <Controls.Input label="Comments" name="comments" value={values.comments}
                                    onChange={handleInputChange} error={errors.comments}/>

                </Grid>
                <Grid item xs={6}>

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
export default EventForm;
