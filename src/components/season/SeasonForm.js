import React from "react";


const SeasonForm = ({season, handleInputChange, saveSeason}) => {


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

                    <label htmlFor="comment" className="h6 small"> Comment</label>
                    <input
                        type="text"
                        className="form-control"
                        id="comment"
                        name="comment"
                        placeholder="My Comment"
                        value={season.comment}
                        required={true}
                        onChange={handleInputChange}
                    />

                <label htmlFor="is_active" className="h6 small p-2"> Active</label>
                <input
                    type="checkbox"
                    className="form-check-inline "
                    name="is_active"
                    checked={JSON.parse(season.is_active)}
                    value={season.is_active}


                />

            </div>
            <button onClick={saveSeason} className="btn btn-success ml-5">
                Submit
            </button>
        </div>
    )

}
export default SeasonForm;
