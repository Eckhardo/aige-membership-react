import React, {useEffect} from "react";
import {Grid} from "@material-ui/core";
import {Form, useForm} from "../useForm";
import Controls from "../controls/Controls";

const initialUserState = {

        PK: "",
        SK: "",
        user_name: "Harro",
        first_name: "Harro",
        last_name: "Einfach",
        city: "Hamburg",
        address: "Meine Strasse 4",
        zip:"22222",
        mobil: "+49 2233445566",
        phone: "+49 2233445566",
        admission_date: new Date(),
        email: "harro@gmx.de",
        is_active: true,
        is_admin: false

};


const UserForm = (props) => {
    const {recordForEdit,addOrEdit} = props;

    /**
     *
     */
    useEffect(() => {
        console.log("UserForm#useEffect::");
        if (recordForEdit!=null) {
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
        if ('user_name' in fieldValues) {
            temp.user_name = fieldValues.user_name ? "" : "This field is required";
        }
        if ('first_name' in fieldValues) {
            temp.first_name = fieldValues.first_name ? "" : "This field is required";
        }
        if ('last_name' in fieldValues) {
            temp.last_name = fieldValues.last_name ? "" : "This field is required";
        }
        if ('email' in fieldValues) {
            temp.email = (/$^ |.+@.+..+/).test(fieldValues.email) ? "" : "Email is not valid";
        }
        if ('mobil' in fieldValues) {
            temp.mobil = fieldValues.mobil.length > 9 ? "" : "Minimum 10 number is required";
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
     */
    useEffect(() => {

    }, [])

    /**
     *
     * @param e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
       if( validate()) {
           addOrEdit(values, resetForm);
       };
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={6}>
                    <Controls.Input label="User Name" name="user_name" value={values.user_name}
                                    onChange={handleInputChange} error={errors.user_name}/>
                    <Controls.Input label="First Name" name="first_name" value={values.first_name}
                                    onChange={handleInputChange} error={errors.first_name}/>
                    <Controls.Input label="Last Name" name="last_name" value={values.last_name}
                                    onChange={handleInputChange} error={errors.last_name}/>
                    <Controls.Input label="Email" name="email" value={values.email}
                                    onChange={handleInputChange} error={errors.email}/>
                    <Controls.Input label="Mobil" name="mobil" value={values.mobil}
                                    onChange={handleInputChange} error={errors.mobil}/>

                </Grid>
                <Grid item xs={6}>
                    <Controls.Input label="Address" name="address" value={values.address}
                                    onChange={handleInputChange} error={errors.address}/>
                    <Controls.Input label="City" name="city" value={values.city}
                                    onChange={handleInputChange} error={errors.city}/>
                    <Controls.Input label="Zip" name="zip" value={values.zip}
                                    onChange={handleInputChange} error={errors.zip}/>


                    <Controls.Checkbox
                        name="is_active"
                        checked={values.is_active}
                        label="Is active"
                        color="primary"
                        onChange={handleInputChange}/>

                    <Controls.DatePicker
                        name="admission_date"
                        value={values.admission_date}
                        label="Admission Date"
                        color="primary"
                        onChange={handleInputChange}/>
                    <Controls.YearPicker
                        name="admission_date"
                        value={values.admission_date}
                        label="Admission Year"
                        color="primary"
                        onChange={handleInputChange}/>


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
export default UserForm;
