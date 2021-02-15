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
        setUser({...user, [name]: value});
    }
    const saveUser = () => {
        console.log('saveUser :');
        UserService.create(user)
            .then(response => {
                setUser(response.data);
                setSubmitted(true);
                console.log('saveUser OK :');
                props.history.push("/users");
            })
            .catch((e) => {
                if (e.response) {
                    setErrorMessage(e.response.data);
                    console.log('error :', e);
                } else {
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
                {errorMessage ? (<div>{errorMessage}</div>) : null
                }
            </div>
        </div>
    )
}

export default AddUser;
