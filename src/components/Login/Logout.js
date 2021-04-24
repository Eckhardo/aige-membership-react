import React, {useEffect} from "react";

import Controls from "../controls/Controls";

import {Form} from "../useForm";
import {useHistory} from "react-router";
import UserContext from "../../App/context/UserContext";
import SimplePopup from "../SimplePopup";

const Logout = props => {

    const context = React.useContext(UserContext);
    const {openPopup, setOpenPopup, isOpen} = props;
    const history = useHistory();
    const title = `Bye bye ${context.currentUser.user_name}`;


    useEffect(() => {
        console.log("Logout#useEffect", isOpen);
        setOpenPopup(true);
    }, [])

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
