import React, {useEffect, useState} from "react";

import Controls from "../controls/Controls";

import {Form, useForm} from "../useForm";
import Popup from "../Popup";
import UserService from "../../services/UserService";
import {useHistory} from "react-router";
import UserContext from "../../App/context/UserContext";

const initialUserState = {
    user_name: "Eckhardo",
    password: "abc"

};
const Login = props => {

    const context = React.useContext(UserContext);


    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

    const [openPopup, setOpenPopup] = useState(true);
    const history = useHistory();

    useEffect(() => {
        setOpenPopup(true);

    }, [])

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
        if ('password' in fieldValues) {
            temp.password = fieldValues.password ? "" : "This field is required";
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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log("valid");
            UserService.checkLogin(values).then(response => {
                    setUser(response.data);
                    localStorage.setItem('user', JSON.stringify(response.data));
                    const user = JSON.parse(localStorage.getItem('user'));
                    console.log("user::", user);
                    setOpenPopup(false);
                    context.setCurrentUser(response.data)
                    history.push("/");
                }
            ).catch(err => {

            })
        }
    }

    return (
        <Popup title="Update Season Member" openPopup={openPopup}
               setOpenPopup={setOpenPopup}>

            {!context.currentUser &&


            <Form onSubmit={handleSubmit}>
                <Controls.Input label="User Nme" name="user_name" value={values.user_name}
                                onChange={handleInputChange} error={errors.user_name}/>
                <Controls.Input label="Password" name="passwd" value={values.password} type="password"
                                onChange={handleInputChange} error={errors.password}/>

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
            </Form>
            }
        </Popup>
    )

}
export default Login;
