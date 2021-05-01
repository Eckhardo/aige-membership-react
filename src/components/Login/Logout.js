import React, {useEffect} from "react";

import Controls from "../controls/Controls";
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

    const logout = (setCurrentUser) => {
        setOpenPopup(false);
        setCurrentUser(null);
        history.push("/");
    }
    return (
        <SimplePopup title={title} openPopup={openPopup}
        >
            <UserContext.Consumer>
                {({ currentUser, setCurrentUser }) => (
                    <Controls.Button
                        type="reset"
                        onClick={() => logout(setCurrentUser)}
                       text="Logout"
                    />
                )}

            </UserContext.Consumer>
        </SimplePopup>
    )

}
export default Logout;
