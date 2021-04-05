import React, {useEffect} from "react";
import {Form, useForm} from "../useForm";
import {Grid} from "@material-ui/core";
import Controls from "../controls/Controls";

const initialSeasonUserState = {

    PK: "",
    SK: "",
    season_year: "",
    user_name: "",
    position_role: "",
    fees_paid: true,
    is_active: true

};


const SeasonUserForm = (props) => {

    const {addOrEdit, recordForEdit, seasonYear} = props;
    /**
     *
     * @param fieldValues
     * @returns {boolean}
     */
    const validate = (fieldValues = values) => {
        let temp = {...errors};
        if ('season_year' in fieldValues) {
            temp.season_year = fieldValues.season_year ? "" : "This field is required";
        }
        if ('user_name' in fieldValues) {
            temp.user_name = fieldValues.userAgent ? "" : "This field is required";
        }

        setErrors({
            ...temp
        });
        if (fieldValues === values) {
            return Object.values(temp).every(val => val === "");
        }
    }


    const {errors, setErrors, values, setValues, handleInputChange, resetForm} = useForm(initialSeasonUserState, true, validate)
    /**
     *
     */
    useEffect(() => {
        console.log("SeasonUserForm#useEffect::");
        if (recordForEdit != null) {
            setValues({...recordForEdit});
            console.log("values:", JSON.stringify(recordForEdit));

        }

    }, [recordForEdit])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            addOrEdit(values, resetForm);
        }
        ;
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item sm={6}>
                    <Controls.Input
                        label="Season Year"
                        name="season_year"
                        value={values.season_year}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={handleInputChange}/>
                </Grid>
                <Grid item sm={6}>
                    Ecki
                </Grid>
            </Grid>

        </Form>
    )

}
export default SeasonUserForm;
