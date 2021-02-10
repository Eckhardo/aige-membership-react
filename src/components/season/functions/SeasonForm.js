import React, {useEffect} from "react";
import Comments from "./Comments";
import PropTypes from 'prop-types';

const SeasonForm = ({comment,season,handleAddComment,handleRemoveComment, handleInputChange, handleInputChangeComments}) => {

    // combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log('[SeasonForm] useEffect');

    }, []);
    return (
        <div className="submit-form border border-success">
            <div >
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
                <select  name="membership_year"  className="form-control" value={season.membership_year} onChange={handleInputChange}>
                    <option value="2021"   >2021</option>
                    <option value="2022"  defaultValue>2022</option>
                    <option value="2023">2023</option>
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                </select>
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
                    handleChange={handleInputChangeComments}
                    handleRemove={handleRemoveComment}
                    handleAdd={handleAddComment}/>
            </div>
        </div>
    )
}

SeasonForm.propTypes= {
    comment:PropTypes.string,
    season:PropTypes.object,
    handleAddComment:PropTypes.func,
    handleRemoveComment:PropTypes.func,
    handleInputChange:PropTypes.func,
    handleInputChangeComments:PropTypes.func
};
export default  React.memo(SeasonForm);
