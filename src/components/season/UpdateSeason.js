import React, {useEffect, useState} from 'react';
import SeasonService from "../../services/SeasonService";
import {Link} from 'react-router-dom';
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";
import SeasonForm from "./functions/SeasonForm";

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
            <h4>Current Season {currentSeason.membership_name}</h4>
            <ErrorBoundary>
                <SeasonForm
                    comment={comment}
                    season={currentSeason}
                    handleInputChange={handleInputChange}
                    handleAddComment={handleAddComment}
                    handleRemoveComment={handleRemoveComment}
                    handleInputChangeComments={handleInputChangeComments}
                /></ErrorBoundary>
            {message ? (<div>{message}</div>) : null}
            <div className="submit-form border border-success mt-2">
                <Link
                    to={"/seasons/"}
                    className="btn btn-warning mr-2 mt2">
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
      </div>);
}


export default UpdateSeason;
