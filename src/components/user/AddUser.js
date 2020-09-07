import React, {useState} from "react";
import UserService from "../../services/UserService";
import UserForm from "./UserForm";

const AddUser = props => {
    const initialUserState = {
        PK: "",
        SK: "",
        user_name: "",
        first_name: "Karl",
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

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleInputChange:", value);
        setUser({...user, [name]: value});
    }
    const saveUser = () => {
        console.log("user save:", user);
        UserService.create(user)
            .then(response => {
                setUser(response.data);
                setSubmitted(true);
                props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };


    return (
        <div className="text-center">

                <h3>Add new User:</h3>
                    <UserForm user={user}
                    handleInputChange={handleInputChange}
                    saveUser={ saveUser}/>


        </div>
    );
}

export default AddUser;
