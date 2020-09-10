import React, {useEffect, useState} from 'react';
import UserService from "../../services/UserService";
import SeasonService from "../../services/SeasonService";
import {Link} from "react-router-dom";
const UpdateSeason = props => {
    const initialUserState = {
         membership_name: "",
        membership_year: "",
        comments :[],
        is_active: true
    };
    const [currentSeason, setCurrentSeason] = useState(initialUserState);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        console.log('useEffect', props.match.params.season_year);
        getSeason(props.match.params.season_year);
    }, [props.match.params.season_year]);
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
        console.log("handleInputChange:",name,value);
        setCurrentSeason({...currentSeason, [name]: value});
    };
    const handleInputChangeArray = (e, index) => {
        const { name, value } = e.target;
        console.log("get Season...",name,value);
        setComment(value);


        const comments= [...currentSeason.comments];



        comments[index] = value;

        console.log("get", comments);
        currentSeason.comments=comments;
        console.log("get Season...",comments);
        setCurrentSeason(currentSeason);
    };


    const updateSeason = () => {
        SeasonService.update(currentSeason)
            .then(response => {
                console.log(response.data);
                props.history.push("/seasons");
            })
            .catch(e => {
                if(e.response.data) {
                    setMessage(e.response.data);
                    console.log('error :', e);
                    console.log('error message data:', e.response.data);
                }
                else {
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

    return (

        <div className="text-center">
            <h4>User {currentSeason.membership_name}</h4>
            <form>
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
                                onChange={ handleInputChange}
                            />
                        </div>
                        <div className="box">
                            <label htmlFor="year" className="h6 small">Year</label>
                            <input
                                type="text"
                                className="form-control"
                                id="membership_year"
                                name="membership_year"
                                placeholder="Year"
                                value={currentSeason.membership_year}
                                required={true}
                                onChange={ handleInputChange}
                            />
                        </div>

                        {currentSeason.comments && currentSeason.comments.map( (c,index) =>
                            <div className="box"   key={index} >
                                <label htmlFor={index} className="h6 small">Comment-{index+1}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Comment"
                                    value={c}
                                    onChange={(e) => handleInputChangeArray(e, index)}
                                />

                            </div>

                        )}



                    <div className="inline">
                        <label htmlFor="is_active" className="h6 small p-2">Active</label>
                        <input
                            type="checkbox"
                            className="form-check-inline "
                            checked={JSON.parse(currentSeason.is_active)}
                            disabled={true}
                            readOnly={true}
                        />

                    </div>

                </div>
            </form>
            <div className="submit-form border border-success mt-2">
            <Link
                to={"/seasons/"}
                className="btn btn-warning mr-2 mt-2"
            >
               List
            </Link>


            <button className="btn btn-danger mr-2 mt-2" onClick={deleteSeason}>
                Delete
            </button>

            <button
                type="submit"
                className="btn btn-success ml-2 mt-2"
                onClick={updateSeason}
            >
                Update
            </button>
            <p>{message}</p>
            </div>

        </div>);

}


export default UpdateSeason;
