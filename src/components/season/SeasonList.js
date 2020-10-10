import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import SeasonService from "../../services/SeasonService";

import ReadSeason from "./ReadSeason";
import ErrorBoundary from "../../ErrorBoundary/ErrorBoundary";

const SeasonList = () => {
    const [seasons, setSeasons] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [seasonName, setSeasonName] = useState('');


    useEffect(() => {
        console.log('retrieveSeasons');
        retrieveSeasons();
    }, []);


    const onChangeSearchSeason = e => {
        const seasonName = e.target.value;
        setSeasonName(seasonName);
        console.log('seasonName:',seasonName);
    };
    const retrieveSeasons = () => {
        SeasonService.getAll()
            .then(response => {
                setSeasons(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const refreshList = () => {
        retrieveSeasons();
        setCurrentSeason(null);
        setCurrentIndex(-1);
        setSeasonName('');
    };

    const setActiveSeason = (season, index) => {
        setCurrentSeason(season);
        setCurrentIndex(index);
    };


    const findBySeasonName = () => {
        SeasonService.get(seasonName)
            .then(response => {
                console.log('findBySeasonName: ',response);
                setSeasons([response.data]);

            })
            .catch(e => {
                console.log('findByUsername: ',e);
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by season year"
                        value={seasonName}
                        onChange={onChangeSearchSeason}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findBySeasonName}
                        >
                            Search
                        </button>
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={refreshList}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Seasons List</h4>
                <ul className="list-group">
                    {seasons &&
                    seasons.map((season, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveSeason(season, index)}
                            key={index}
                        >
                            {season.membership_name}
                        </li>
                    ))}
                </ul>
                <Link
                    to={"/addSeason/"}
                    className="btn btn-warning m-2"
                >
                    Add
                </Link>
            </div>
            <div className="col-md-6">

                {currentSeason ? (
                   <ReadSeason season={currentSeason}/>

                ) : (
                    <div>
                        <br />
                        <p>Please click on a Season...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SeasonList;
