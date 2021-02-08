import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Comments from "./Comments";


const SeasonForm = ({comment,season,handleAddComment,handleRemoveComment, handleInputChange, handleInputChangeComments}) => {

    useEffect(() => {
        console.log('[SeasonForm] useEffect');

    }, []);
    return (
        <div className="submit-form border border-success">
            <div className="box">
                <label htmlFor="membership_name" className="h6 small"> Season Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="membership_name"
                    name="membership_name"
                    placeholder="Season Name"
                    value={season.membership_name}
                    required={true}
                    onChange={handleInputChange}
                />
                <label htmlFor="membership_year" className="h6 small"> Season Year</label>
                <input
                    type="text"
                    className="form-control"
                    id="membership_year"
                    name="membership_year"
                    placeholder="Season Year"
                    value={season.membership_year}
                    required={true}
                    onChange={handleInputChange}
                />
                <label htmlFor="is_active" className="h6 small p-2"> Active</label>
                <input
                    type="checkbox"
                    className="form-check-inline "
                    name="is_active"
                    defaultChecked={JSON.parse(season.is_active)}
                    value={season.is_active}
                    onChange={handleInputChange}
                />
                <Comments
                    comment={comment}
                    comments={season.comments}
                    handleInputChangeComments={handleInputChangeComments}
                    handleRemoveComment={handleRemoveComment}
                    handleAddComment={handleAddComment}/>

            </div>

        </div>
    )

}
export default SeasonForm;
