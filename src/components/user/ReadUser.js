import React from "react";
import {Link} from "react-router-dom";


const ReadUser = ({user}) => {


    return <div>
        <h4>User</h4>
        <div>
            <label>
                <strong>User Name:</strong>
            </label>{" "}
            {user.user_name}
        </div>
        <div>
            <label>
                <strong>First Name:</strong>
            </label>{" "}
            {user.first_name}
        </div>
        <div>
            <label>
                <strong>Last Name:</strong>
            </label>{" "}
            {user.last_name}
        </div>
        <div>
            <label>
                <strong>Email:</strong>
            </label>{" "}
            {user.email}
        </div>
        <div>
            <label>
                <strong>Mobil:</strong>
            </label>{" "}
            {user.mobil}
        </div>
        <div>
            <label>
                <strong>is active:</strong>
            </label>{" "}
            <input
                type="checkbox"
                className="form-check-inline "
                id="is_admin"
                name="is_admin"
                readOnly={true}
                checked={user.is_active === 'true' ? true : false}

            />
        </div>

        <Link
            to={"/user/" + user.user_name}
            className="btn btn-warning"
        >
            Edit
        </Link>
    </div>
}
export default ReadUser;
