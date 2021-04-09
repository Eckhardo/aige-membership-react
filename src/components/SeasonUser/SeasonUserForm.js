import React, {useEffect, useState} from "react";
import {Form, useForm} from "../useForm";
import {Grid} from "@material-ui/core";
import Controls from "../controls/Controls";
import Control from "../controls/Controls";
import UserService from "../../services/UserService";
import Notification from "../controls/Notification";
import _ from "underscore";

const initialSeasonUserState = {

    PK: "",
    SK: "",
    season_year: "",
    user_name: "",
    position_role: "",
    fees_paid: true,
    is_active: true

};
const positions= [
    {id:"1. Vorsitzender", title:"1. Vorsitzender"},
    {id:"2. Vorsitzender", title:"2. Vorsitzender"},
    {id:"Gewaesserwart", title:"Gewaesserwart"},
    {id:"Kassenwart", title:"Kassenwart"},
    {id:"Schriftfuehrer", title:"Schriftfuehrer"},
]


const SeasonUserForm = (props) => {

    const {seasonUsers,addOrEdit, recordForEdit} = props;

    const [activeMembers, setActiveMembers] = useState([]);
    const [notify, setNotify] = useState({isOpen: false, message: "", type: ""});

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
            temp.user_name = fieldValues.user_name ? "" : "This field is required";
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
        setValues({...recordForEdit});
        console.log("values:", JSON.stringify(recordForEdit));
        retrieveActiveMembers();

    }, [recordForEdit])
    const retrieveActiveMembers = () => {
        UserService.getAll().then((response) => {
            let users = response.data;
            console.log("season users::", JSON.stringify(seasonUsers));
            const nonActiveMembers = _.intersection(users.map((member) => {
                return member.user_name }), seasonUsers);
            console.log("nonActiveMembers::", JSON.stringify(nonActiveMembers));

            const items = users.filter(member => !nonActiveMembers.includes(member.user_name));
            console.log("items::", JSON.stringify(items));
            let myTuple = users.map(s => {
                return {id: s.user_name, title: s.user_name}
            })
            setActiveMembers(myTuple);
        }).catch(err => {
            setNotify({isOpen: true, message: "Create new Season failed", type: "error"});
        })
    }
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
                    {values.PK ?
                        <Controls.Input
                            label="Member  Name"
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
                            error={errors.user_name}

                        />}
                    <Controls.Select
                        label="Position"
                        name="position_role"
                        options={positions}
                        value={values.position_role}
                        onChange={handleInputChange}
                        error={errors.position_role}

                    />

                </Grid>

                <Grid item sm={6}>
                    <div style={{display: 'flex'}}>
                    <Control.Checkbox
                        color="primary"
                        name ="fees_paid"
                        checked ={values.fees_paid}
                        label ="Fees paid"
                        onChange={handleInputChange}/>
                    <Control.Checkbox
                        color="primary"
                        name ="is_active"
                        checked ={values.is_active}
                        label ="Is active"
                        onChange={handleInputChange}/>
                    </div>
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
export default SeasonUserForm;
