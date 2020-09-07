import React from "react";


const UserForm = ({user, handleInputChange, saveUser}) => {

    return (
    <div className="submit-form border border-success">

        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="user_name"
                name="user_name"
                placeholder="User Name"
                value={user.user_name}

                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                value={user.first_name}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                value={user.last_name}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="zip"
                name="zip"
                placeholder="Zip"
                value={user.zip}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                placeholder="City"
                value={user.city}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
            <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="Address"
                value={user.address}
                onChange={handleInputChange}
            />
        </div>
        <div className="form-group">
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
        <div className="inline">
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


            <button onClick={saveUser} className="btn btn-success ml-5">
                Submit
            </button>
        </div>
    </div>
    )

}
export default  UserForm;
