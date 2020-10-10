import React from "react";


const UserForm = ({user, handleInputChange, saveUser}) => {


    return (
        <div className="submit-form border border-success">
            <div className="row">
                <div className="col">
                    <label htmlFor="user_name" className="h6 small"> User Name</label>
                    <input
                        type="text"
                        className="form-control "
                        id="user_name"
                        name="user_name"
                        placeholder="User Name"
                        value={user.user_name}
                        required={true}
                        onChange={handleInputChange}
                    />
                </div>
                <div class="col">
                    <label htmlFor="first_name" className="h6 small"> First Name</label>
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
                    <label htmlFor="last_name" className="h6 small"> Last Name</label>
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
                    <label htmlFor="zip" className="h6 small"> Zip</label>
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
                    <label htmlFor="city" className="h6 small"> City</label>
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
                    <label htmlFor="address" className="h6 small"> Address</label>
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
                    <label htmlFor="email" className="h6 small"> Email</label>
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
                    <label htmlFor="mobil" className="h6 small"> Mobil</label>
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
            <div className="row">
                <div className="col">
            <label htmlFor="phone" className="h6 small"> Phone</label>
            <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={handleInputChange}
            />

                </div>
                <div className="col">
                    <div className="inline ">
                        <label htmlFor="is_active" className="h6 small p-2"> Active</label>
                        <input
                            type="checkbox"
                            className="form-check-inline "
                            checked={JSON.parse(user.is_active)}
                            disabled={true}
                            readOnly={true}

                        />
                        <label htmlFor="is_admin" className="h6 small p-2"> Admin</label>
                            type="checkbox"
                            className="form-check-inline "
                            checked={JSON.parse(user.is_admin)}
                            disabled={true}
                            readOnly={true}
                        />
                    </div>
                </div>

            </div>

            <button onClick={saveUser} className="btn btn-success ml-5">
                Submit
            </button>
        </div>
    )

}
export default UserForm;
