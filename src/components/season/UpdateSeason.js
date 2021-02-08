import React, {useEffect, useState} from 'react';
import SeasonService from "../../services/SeasonService";
import {Link} from 'react-router-dom';
import Comments from "./functions/Comments";

const UpdateSeason = props => {
    const initialUserState = {
        membership_name: "",
        membership_year: "",
        comments: [],
        is_active: true
    };
    const [currentSeason, setCurrentSeason] = useState(initialUserState);
    const [comment, setComment] = useState("New Comment");
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log('[UpdateSeason]useEffect', props.match.params.season_year);
        getSeason(props.match.params.season_year);
    }, [props.match.params.season_year]);

    const getSeason = year => {
        console.log("get Season...");
        SeasonService.get(year)
            .then(response => {
                setCurrentSeason(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    };

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentSeason({...currentSeason, [name]: value});
    };
    const handleInputChangeComments = (e, index) => {
        const {name, value} = e.target;
        console.log('handleInputChangeComments:', name, value)
        setComment(value);
        const comments = [...currentSeason.comments];
        comments[index] = value;
        currentSeason.comments = comments;
        setCurrentSeason(currentSeason);
    };

    const updateSeason = () => {
        SeasonService.update(currentSeason).then(response => {
            props.history.push("/seasons");
        })
            .catch(e => {
                if (e.response.data) {
                    setMessage(e.response.data);
                    console.error('error :', e);
                } else {
                    setMessage(e);
                    console.error('error:', e);
                }
            });
    };

    const deleteSeason = () => {
        let year = currentSeason.membership_year;
        SeasonService.remove(year).then(response => {
            props.history.push("/seasons");
        })
            .catch(e => {
                console.error(e);
            });
    };
    // handle click event of the Remove button
    const handleRemoveComment = index => {
        // const list = currentSeason.comments.slice();
        const list = [...currentSeason.comments];
        list.splice(index, 1);
        const mySeason = {...currentSeason};
        mySeason.comments = list;
        setCurrentSeason(mySeason);
    };

    // handle click event of the Add button
    const handleAddComment = () => {
        // const list = currentSeason.comments.slice();
        const list = [...currentSeason.comments];
        list.push('');
        const mySeason = {...currentSeason};
        mySeason.comments = list;
        setCurrentSeason(mySeason);
    };
    return (
        <div className="text-center">
            <h4>User {currentSeason.membership_name}</h4>
            <div className="submit-form border border-success">
                <div className="box">
                    <label htmlFor="year" className="h6 small">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="membership_name"
                        name="membership_name"
                        placeholder="Name"
                        value={currentSeason.membership_name}
                        required={true}
                        onChange={handleInputChange}
                    />
                    <label htmlFor="year" className="h6 small">Year</label>
                    <input
                        type="text"
                        className="form-control"
                        id="membership_year"
                        name="membership_year"
                        placeholder="Year"
                        value={currentSeason.membership_year}
                        required={true}
                        onChange={handleInputChange}
                    />

                    <label htmlFor="is_active" className="h6 small p-2"> Active</label>
                    <input
                        type="checkbox"
                        className="form-check-inline "
                        defaultChecked={JSON.parse(currentSeason.is_active)}
                        disabled={true}
                        readOnly={true}
                    />
                    <Comments
                        comment={comment}
                        comments={currentSeason.comments}
                        handleInputChangeComments={handleInputChangeComments}
                        handleRemoveComment={handleRemoveComment}
                        handleAddComment={handleAddComment}/>
                    <div className="submit-form border border-success mt-2">
                        <Link
                            to={"/seasons/"}
                            className="btn btn-warning mr-2 mt2" >
                            List
                        </Link>
                        <button className="btn btn-danger mr-2 mt2" onClick={deleteSeason}>
                            Delete
                        </button>
                        <button
                            type="submit"
                            className="btn btn-success ml-2 mt2"
                            onClick={updateSeason}>
                            Update
                        </button>
                        <p>{message}</p>
                    </div>
                </div>
            </div>
        </div>);
}


export default UpdateSeason;
