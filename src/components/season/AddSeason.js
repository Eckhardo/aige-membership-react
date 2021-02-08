import React, {useEffect, useState} from "react";
import SeasonService from "../../services/SeasonService";
import SeasonForm from "./functions/SeasonForm";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import {Link} from "react-router-dom";

const AddSeason = props => {

    useEffect(() => {
        console.log('[AddSeason] useEffect');

    }, []);
    const initialState = {
        membership_name: "",
        membership_year: "",
        comments: [''],
        is_active: true
    };
    const [season, setSeason] = useState(initialState);
    const [comment, setComment] = useState("New Comment");
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = event => {
        const {name, value} = event.target;
        setSeason({...season, [name]: value});

    }
    const handleInputChangeComments = (event, index) => {
        const {name, value} = event.target;
        setComment(value);
        const comments = [...season.comments];
        comments[index] = value;
        season.comments = comments;
        setSeason(season);
    }

    // handle click event of the Remove button
    const handleRemoveComment = index => {
        // const list = currentSeason.comments.slice();
        const list = [...season.comments];
        list.splice(index, 1);
        const mySeason = {...season};
        mySeason.comments = list;
        setSeason(mySeason);
    };

    // handle click event of the Add button
    const handleAddComment = () => {
        // const list = currentSeason.comments.slice();
        const list = [...season.comments];
        list.push('');
        const mySeason = {...season};
        mySeason.comments = list;
        setSeason(mySeason);
    };
    const saveSeason = () => {
        SeasonService.create(season).then(response => {
            props.history.push("/seasons");
        })
            .catch((e) => {
                setErrorMessage(e);
            });
    };
    const refreshList = () => {
        setSeason(initialState);

    }

    return (
        <div>
            <div className="text-center">
                <h4>Add new Season:</h4>
                <ErrorBoundary>
                    <SeasonForm
                        comment={comment}
                        season={season}
                        handleInputChange={handleInputChange}
                        handleAddComment={handleAddComment}
                        handleRemoveComment={handleRemoveComment}
                        handleInputChangeComments={handleInputChangeComments}
                    /></ErrorBoundary>
                {errorMessage ? (<div>{errorMessage}</div>) : null}
                <button onClick={saveSeason} className="btn btn-success ml-5">
                    Submit
                </button>
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={refreshList}
                >
                    Clear
                </button>
                <Link
                    to={"/seasons/"}
                    className="btn btn-warning mr-2 mt2">
                    List
                </Link>
            </div>
        </div>
    )
}
export default AddSeason;
