import React from "react";


const UserForm = ({user, handleInputChange, saveUser}) => {


    return (
        <div className="submit-form border border-success">
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        id="user_name"
                        name="user_name"
                        placeholder="User Name"
                        value={user.user_name}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="col">
                    <input
                        type="text"
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        placeholder="First Name"
                        value={user.first_name}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <input
                        type="text"
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        placeholder="Last Name"
                        value={user.last_name}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="col">
                    <input
                        type="text"
                        className="form-control"
                        id="zip"
                        name="zip"
                        placeholder="Zip"
                        value={user.zip}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">

                    <input
                        type="text"
                        className="form-control"
                        id="city"
                        name="city"
                        placeholder="City"
                        value={user.city}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="col">

                    <input
                        type="text"
                        className="form-control"
                        id="address"
                        name="address"
                        placeholder="Address"
                        value={user.address}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">

                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="col">

                    <input
                        type="text"
                        className="form-control"
                        id="mobil"
                        name="mobil"
                        placeholder="Mobil"
                        value={user.mobil}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={handleInputChange}
            />

            <div className="inline ">
                <label htmlFor="is_active" className="p-2"> Active</label>
                <input
                    type="checkbox"
                    className="form-check-inline "
                    id="is_active"
                    name="is_active"
                    checked={user.is_active}
                    value={user.is_active}
                    onChange={handleInputChange}
                />
                <label htmlFor="is_admin" className="p-2"> Admin</label>
                <input
                    type="checkbox"
                    className="form-check-inline "
                    id="is_admin"
                    name="is_admin"
                    checked={user.is_admin}
                    value={user.is_admin}
                    onChange={handleInputChange}
                />
            </div>
            <button onClick={saveUser} className="btn btn-success ml-5">
                Submit
            </button>
        </div>
    )

}
export default UserForm;
