import React, {useEffect, useState} from "react";
import {Form, useForm} from "../useForm";
import {Grid} from "@material-ui/core";
import Controls from "../controls/Controls";
import Control from "../controls/Controls";
import UserService from "../../services/UserService";
import Notification from "../controls/Notification";

const initialSeasonUserState = {

    PK: null,
    SK: null,
    season_year: new Date().getFullYear(),
    user_name: " ",
    position_role: "",
    fees_paid: true,
    is_active: true

};
const positions = [
    {id: "1. Vorsitzender", title: "1. Vorsitzender"},
    {id: "2. Vorsitzender", title: "2. Vorsitzender"},
    {id: "Gewaesserwart", title: "Gewaesserwart"},
    {id: "Kassenwart", title: "Kassenwart"},
    {id: "Schriftfuehrer", title: "Schriftfuehrer"},
]


const SeasonUserForm = (props) => {


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
            temp.user_name = fieldValues.user_name ? "" : "No member available";
        }

        setErrors({
            ...temp
        });
        if (fieldValues === values) {
            return Object.values(temp).every(val => val === "");
        }
    }


    const {errors, setErrors, values, setValues, handleInputChange, resetForm} = useForm(initialSeasonUserState, true, validate)

    const {seasonUsers, addOrEdit, recordForEdit} = props;
    const [activeMembers, setActiveMembers] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});


    /**
     *
     */
    useEffect(() => {
        console.log("SeasonUserForm#useEffect::");
        if (recordForEdit != null) {
            setValues({...recordForEdit});
        }

        console.log("useEffect::values:", JSON.stringify(values));
        console.log("useEffect::recordForEdit:", JSON.stringify(recordForEdit));
        retrieveActiveMembers();

    }, [recordForEdit, setValues])
    const retrieveActiveMembers = () => {
        UserService.getAll().then((response) => {
            console.log("retrieveActiveMembers values:", JSON.stringify(values));
            let users = retrieveNonDuplicateUsers(response.data, seasonUsers);

            console.log("active users:", JSON.stringify(users));
            let myTuple = users.map(s => {
                return {id: s, title: s}
            })
            setActiveMembers(myTuple);


        }).catch(err => {
            setNotify({isOpen: true, message: "Create new Season failed", type: "error"});
        })
    }

    function retrieveNonDuplicateUsers(users, seasonUsers) {
        let userNames = [];
        users.forEach((user, index) => {
            userNames[index] = user.user_name
        })
        console.log("all users:", JSON.stringify(userNames));
        console.log("season users:", JSON.stringify(seasonUsers));
        for (let i = userNames.length - 1; i >= 0; i--) {
            for (let j = 0; j < seasonUsers.length; j++) {
                if (userNames[i] === seasonUsers[j]) {
                    userNames.splice(i, 1);
                }
            }
        }
        return userNames;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form#submit::", JSON.stringify(values));
        if (validate()) {
            console.log("Is valid::");
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
                    {values.PK ?
                        <Controls.Input
                            label="Member Name"
                            name="user_name"
                            value={values.user_name}
                            InputProps={{
                                readOnly: true,
                            }}
                            onChange={handleInputChange}/>
                        : <Controls.Select
                            label="Member"
                            name="user_name"
                            options={activeMembers}
                            value={values.user_name}
                            onChange={handleInputChange}
                            disabled={activeMembers.length === 0 && !values.PK}
                            error={errors.user_name}

                        />}
                    <Controls.Select
                        label="Position"
                        name="position_role"
                        options={positions}
                        disabled={activeMembers.length === 0 && !values.PK}
                        value={values.position_role}
                        onChange={handleInputChange}
                        error={errors.position_role}

                    />

                </Grid>

                <Grid item sm={6}>
                    <div style={{display: 'flex'}}>
                        <Control.Checkbox
                            color="primary"
                            name="fees_paid"
                            checked={values.fees_paid}
                            label="Fees paid"
                            disabled={activeMembers.length === 0 && !values.PK}
                            onChange={handleInputChange}/>
                        <Control.Checkbox
                            color="primary"
                            name="is_active"
                            checked={values.is_active}
                            label="Is active"
                            disabled={activeMembers.length === 0 && !values.PK}
                            onChange={handleInputChange}/>
                    </div>
                    <div>

                        <Controls.Button
                            text="Submit"
                            type="submit"
                            disabled={activeMembers.length === 0 && !values.PK}
                        />
                        <Controls.Button
                            text="Reset"
                            type="reset"
                            disabled={activeMembers.length === 0 && !values.PK}
                            onClick={resetForm}
                        />
                    </div>
                </Grid>
            </Grid>
            <Notification notify={notify} setNotify={setNotify}/>
        </Form>


    )

}
export default SeasonUserForm;
