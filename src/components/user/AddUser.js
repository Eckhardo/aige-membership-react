import React, {useState} from "react";
import UserService from "../../services/UserService";
import UserForm from "./UserForm";

const AddUser = props => {
    const initialUserState = {
        user_name: "",
        first_name: "",
        last_name: "",
        city: "",
        mobil: "",
        phone: "",
        admission_date: "",
        address: "",
        zip: "",
        email: "",
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
                setSubmitted(true);
                props.history.push("/users");
            })
            .catch((e) => {
                   setErrorMessage(e);
                    console.log('error:', e);
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
