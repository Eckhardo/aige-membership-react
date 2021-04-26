import React from "react";

import Controls from "../controls/Controls";

import {Form} from "../useForm";
import Popup from "../Popup";
import {useHistory} from "react-router";
import {Typography} from "@material-ui/core";

const initialUserState = {
    user_name: "Eckhardo",
    event_name: "Anangeln"

};
const LoginForm = props => {

    const {onSubmit, openPopup, setOpenPopup, counter, values, setValues} = props;
    const history = useHistory();

    const handleInputChange = event => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
    }

    const resetForm = () => {
        setValues(initialUserState);
    }

    return (
        <Popup title="AIGE Login" openPopup={openPopup}
               setOpenPopup={setOpenPopup}>
            {counter > 0 &&
            <Typography variant="h6"
                        component="div"
                        color="primary">
                {"User unknown ! You tried " + counter + " times..."}
            </Typography>

            }
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
