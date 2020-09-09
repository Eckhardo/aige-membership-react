import React, {useEffect, useState} from "react";
import UserService from '../../services/UserService'

const UpdateUser = props => {
    const initialUserState = {
        PK: "",
        SK: "",
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
        is_active: false,
        is_admin: false
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
        const {name, value} = event.target;
        console.log('name', name);
        console.log('value', value);
        setCurrentUser({...currentUser, [name]: value});
    };


    const updateUser = () => {
        UserService.update(currentUser)
            .then(response => {
                console.log(response.data);
                props.history.push("/users");
            })
            .catch(e => {
                if (e.response.data) {
                    setMessage(e.response.data);
                    console.log('error :', e);
                    console.log('error message data:', e.response.data);
                } else {
                    setMessage(e);
                    console.log('error:', e);
                }
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

        <div className="text-center">
            <h4>User {currentUser.user_name}</h4>
            <form>
                <div className="submit-form border border-success bg-light">

                    <div className="row">
                        <div className="col">
                            <label htmlFor="first_name" className="h6 small">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                value={currentUser.first_name}
                                required={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">

                            <label htmlFor="last_name" className="h6 small">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="last_name"
                                name="last_name"
                                placeholder="Last Name"
                                value={currentUser.last_name}
                                required={true}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <label htmlFor="zip" className="h6 small">Zip</label>
                            <input
                                type="text"
                                className="form-control"
                                id="zip"
                                name="zip"
                                placeholder="Zip"
                                value={currentUser.zip}
                                required={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col">

                            <label htmlFor="city" className="h6 small">City</label>
                            <input
                                type="text"
                                className="form-control"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={currentUser.city}
                                required={true}
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">


                            <label htmlFor="address" className="h6 small">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={currentUser.address}
                                required={true}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="email" className="h6 small">Email</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={currentUser.email}
                                onChange={handleInputChange}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col">

                            <label htmlFor="mobil" className="h6 small">Mobil</label>
                            <input
                                type="text"
                                className="form-control"
                                id="mobil"
                                name="mobil"
                                placeholder="Mobil"
                                value={currentUser.mobil}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="col">
                            <label htmlFor="phone" className="h6 small">Phone</label>
                            <input
                                type="text"
                                className="form-control"
                                id="phone"
                                name="phone"
                                placeholder="Phone"
                                value={currentUser.phone}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <div className="inline">
                        <label htmlFor="is_active" className="h6 small p-2">Active</label>
                        <input
                            type="checkbox"
                            className="form-check-inline "
                            id="is_active"
                            name="is_active"
                            checked={JSON.parse(currentUser.is_active)}
                            disabled={true}
                            onChange={handleInputChange}
                        />
                        <label htmlFor="is_admin" className="h6 small p-2">Admin</label>
                        <input
                            type="checkbox"
                            className="form-check-inline "
                            id="is_admin"
                            name="is_admin"
                            checked={JSON.parse(currentUser.is_admin)}
                            disabled={true}
                            onChange={handleInputChange}
                        />
                    </div>

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

            </form>


        </div>
    );

};

export default UpdateUser;
