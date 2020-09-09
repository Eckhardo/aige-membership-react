import React, {useState} from "react";
import UserService from "../../services/UserService";
import UserForm from "./UserForm";

const AddUser = props => {
    const initialUserState = {
        user_name: "Berit",
        first_name: "Berit",
        last_name: "Samstroem",
        city: "Vrigstad",
        mobil: "+461452323",
        phone: "",
        admission_date: "",
        address: "Rusken Gatan 3",
        zip: "22345",
        email: "berit@telia.se",
        is_active: true,
        is_admin: false
    };
    const [user, setUser] = useState(initialUserState);
    const [submitted, setSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleInputChange:", value);
        setUser({...user, [name]: value});
    }
    const saveUser = () => {
        console.log("user save:", user);
        UserService.create(user)
            .then(response => {
                console.log('response:', response);
                setUser(response.data);
                setSubmitted(true);
                props.history.push("/users");
            })
            .catch((e) => {

                if(e.response.data) {
                    setErrorMessage(e.response.data);
                    console.log('error :', e);
                    console.log('error message data:', e.response.data);
                }
                else {
                    setErrorMessage(e);
                    console.log('error:', e);
                }

            });
    };


    return (
        <div>

            <div className="text-center">
                <h3>Add new User:</h3>
                <UserForm user={user}
                          handleInputChange={handleInputChange}
                          saveUser={saveUser}/>
                {errorMessage ? (<div>{errorMessage}</div>): null
                }
            </div>
        </div>
    )
}

export default AddUser;
