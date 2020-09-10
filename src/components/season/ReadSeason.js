import React from "react";
import {Link} from "react-router-dom";


const ReadSeason = ({season}) => {


    return <div>
        <h4>Season Name   {season.membership_name}</h4>
        <div>
            <label>
                <strong>Year:</strong>
            </label>{" "}
            {season.membership_year}
        </div>
         <div>
            <label>
                <strong>is active:</strong>
            </label>{" "}
            <input
                type="checkbox"
                className="form-check-inline "
                disabled={true}
                readOnly={true}
                checked={JSON.parse(season.is_active )}

            />
        </div>
        <label>
            <strong>Comments:</strong>
        </label>
        <ul className="list-group">
        {season.comments && season.comments.map( (comment, index ) =>
            <li
                className= "list-group-item "
                key={index}
            >
                {comment}
            </li>
        )}
        </ul>
        <Link
            to={"/season/" + season.membership_year}
            className="btn btn-warning"
        >
            Edit
        </Link>
    </div>
}
export default ReadSeason;
