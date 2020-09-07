import React, {useEffect, useState} from "react";
import UserService from '../../services/UserService'

const UpdateUser = props => {
    const initialUserState = {
        PK:"",
        SK:"",
        user_name: "",
        first_name: "",
        last_name: "",
        city: "",
        mobil:"",
        phone:"",
        admission_date:"",
        address: "",
        zip: "",
        email:"",
        is_active: true,
        is_admin: "true"
    };
    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [message, setMessage] = useState("");
    const getUser = userName => {
        UserService.get(userName)
            .then(response => {
                setCurrentUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        console.log('useEffect');
        getUser(props.match.params.user_name);
    }, [props.match.params.user_name]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        console.log('name', name);
        console.log('value', value);
        setCurrentUser({ ...currentUser, [name]: value });
    };


    const updateUser = () => {
        UserService.update(currentUser)
            .then(response => {
                console.log(response.data);
                setMessage("The user was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const deleteUser = () => {
        UserService.remove(currentUser.user_name)
            .then(response => {
                console.log(response.data);
                props.history.push("/users");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentUser ? (
                <div className="edit-form">
                    <h4>User</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="user_name">User Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="user_name"
                                name="user_name"
                                value={currentUser.user_name}
                                readOnly={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                value={currentUser.first_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                value={currentUser.last_name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="zip">Zip</label>
                        <input
                            type="text"
                            className="form-control"
                            id="zip"
                            name="zip"
                            value={currentUser.zip}
                            onChange={handleInputChange}
                        />
                    </div>
                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                value={currentUser.city}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Street</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                value={currentUser.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={currentUser.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="is_active"> Active</label>
                            <input
                                type="checkbox"
                                className="form-check"
                                id="is_active"
                                name="is_active"
                                value= {currentUser.is_active}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="is_admin"> Admin</label>
                            <input
                                type="checkbox"
                                className="form-check"
                                id="is_admin"
                                name="is_admin"
                                value= {currentUser.is_admin}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>


                    <button className="btn btn-danger mr-2" onClick={deleteUser}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success ml-2"
                        onClick={updateUser}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Please click on a User...</p>
                </div>
            )}
        </div>
    );
};

export default UpdateUser;
