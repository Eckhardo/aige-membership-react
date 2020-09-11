import React, {useEffect, useState} from 'react';
import SeasonService from "../../services/SeasonService";
import {Link} from 'react-router-dom';

const UpdateSeason = props => {
    const initialUserState = {
        membership_name: "",
        membership_year: "",
        comments: [],
        is_active: true
    };
    const [currentSeason, setCurrentSeason] = useState(initialUserState);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        console.log('useEffect', props.match.params.season_year);
        getSeason(props.match.params.season_year);
    }, []);
    const getSeason = year => {
        console.log("get Season...");
        SeasonService.get(year)
            .then(response => {
                setCurrentSeason(response.data);
                console.log(response.data.comments);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleInputChange = event => {
        const {name, value} = event.target;
        console.log("handleInputChange:", name, value);
        setCurrentSeason({...currentSeason, [name]: value});
    };
    const handleInputChangeArray = (e, index) => {
        const {name, value} = e.target;
        console.log("get Season...", name, value);
        setComment(value);


        const comments = [...currentSeason.comments];


        comments[index] = value;

        console.log("get", comments);
        currentSeason.comments = comments;
        console.log("get Season...", comments);
        setCurrentSeason(currentSeason);
    };


    const updateSeason = () => {
        SeasonService.update(currentSeason)
            .then(response => {
                console.log(response.data);
                props.history.push("/seasons");
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

    const deleteSeason = () => {
        SeasonService.remove(currentSeason.membership_year)
            .then(response => {
                console.log(response.data);
                props.history.push("/seasons");
            })
            .catch(e => {
                console.log(e);
            });
    };
    // handle click event of the Remove button
    const handleRemoveClick = index => {
        const list = [...currentSeason.comments];
        list.splice(index, 1);
        const mySeason = {...currentSeason};
        mySeason.comments = list;
        setCurrentSeason(mySeason);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        const list = [...currentSeason.comments];
        list.push('New Comment');
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
                        checked={JSON.parse(currentSeason.is_active)}
                        disabled={true}
                        readOnly={true}
                    />


                    {currentSeason.comments && currentSeason.comments.map((c, index) =>
                        <div key={index}>
                            <label htmlFor={index} className="h6 small">Comment-{index + 1}</label>
                            <input
                                type="text"
                                placeholder="Comment"
                                value={c}
                                className="form-control"
                                onChange={(e) => handleInputChangeArray(e, index)}
                            />

                            {currentSeason.comments.length !== 1 &&
                            <button
                                className="badge badge-primary mr-2"
                                onClick={() => handleRemoveClick(index)}>Remove
                            </button>}

                            {currentSeason.comments.length - 1 === index &&
                            (<button
                                className="badge badge-primary mr-2"
                                onClick={handleAddClick}>Add
                            </button>)}
                        </div>
                    )}
                    {!currentSeason.comments ||
                    currentSeason.comments.length === 0 && (
                        <div>
                            <label htmlFor="comment" className="h6 small">Comment </label>
                            <input
                                type="text"
                                placeholder="Comment"
                                value="Hallo Comment"
                                name="comment"
                                className="form-control"
                                onChange={(e) => handleInputChangeArray(e, 0)}
                            />

                        </div>)}


                    <div className="submit-form border border-success mt-2">
                        <Link
                            to={"/seasons/"}
                            className="btn btn-warning mr-2 mt2"
                        >
                            List
                        </Link>


                        <button className="btn btn-danger mr-2 mt2" onClick={deleteSeason}>
                            Delete
                        </button>

                        <button
                            type="submit"
                            className="btn btn-success ml-2 mt2"
                            onClick={updateSeason}
                        >
                            Update
                        </button>
                        <p>{message}</p>
                    </div>

                </div>

            </div>
        </div>);

}


export default UpdateSeason;
