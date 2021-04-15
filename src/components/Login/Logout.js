import React, {useEffect, useState} from "react";

import Controls from "../controls/Controls";

import {Form, useForm} from "../useForm";
import Popup from "../Popup";
import {useHistory} from "react-router";
import UserContext from "../../App/context/UserContext";
import SimplePopup from "../SimplePopup";

const initialUserState = {
    user_name: "Eckhardo",
    password: "abc"

};
const Logout = props => {

    const context = React.useContext(UserContext);


    const {openPopup, setOpenPopup, isOpen} =props;
    const history = useHistory();
const  title= `Bye bye ${context.currentUser.user_name}`;

    // Build Form from template
    const {values, setValues, errors, setErrors, handleInputChange, resetForm}
        = useForm(initialUserState, false, null);

    useEffect(() => {
        console.log("Logout#useEffect", isOpen);
        setOpenPopup(true);
    },[])

    const logout = () => {
        setOpenPopup(false);

        context.setCurrentUser(null);


        history.push("/users");
    }
    return (
        <SimplePopup title={title} openPopup={openPopup}
           >

            {context.currentUser &&

            <Form>
                <div>

                    <Controls.Button
                        text="Logout"
                        type="reset"
                        onClick={logout}
                    />

                </div>
            </Form>
            }
        </SimplePopup>
    )

}
export default Logout;
