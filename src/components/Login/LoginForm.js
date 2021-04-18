import React, {useState} from "react";

import Controls from "../controls/Controls";

import {Form, useForm} from "../useForm";
import Popup from "../Popup";
import UserService from "../../services/UserService";
import {useHistory} from "react-router";

const initialUserState = {
    user_name: "Eckhardo",
    password: "abc"

};
const LoginForm = props => {

    const {onSubmit, openPopup, setOpenPopup,values, setValues} = props;
    const history = useHistory();

    const handleInputChange = event => {
        const {value, name} = event.target;
         setValues({...values, [name]: value});
    }

    const resetForm = ()=>{
        setValues(initialUserState);
    }

    return (
        <Popup title="AIGE Login" openPopup={openPopup}
               setOpenPopup={setOpenPopup}>

            <Form onSubmit={onSubmit}>
                <Controls.Input label="User Name" name="user_name" value={values.user_name}
                                onChange={handleInputChange}/>
                <Controls.Input label="Password" name="passwd" value={values.password} type="password"
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
            </Form>
        </Popup>
    )
}
export default LoginForm;
