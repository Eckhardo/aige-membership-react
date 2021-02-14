import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import SeasonService from "../../services/SeasonService";

import ReadSeason from "./functions/ReadSeason";

import SearchSeason from "./functions/SearchSeason";

const SeasonList = () => {
    const [seasons, setSeasons] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);

    // combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log(' [SeasonList] useEffect');
        retrieveSeasons();
    }, [seasons]);


    const retrieveSeasons = () => {
        SeasonService.getAll().then(response => {
            setSeasons(response.data);
        })
            .catch(e => {
                console.log(e);
            });
    };

    const setActiveSeason = (season, index) => {
        setCurrentSeason(season);
        setCurrentIndex(index);
    };
    const onLoadFilteredSeasons = filteredSeasons => {
        if(filteredSeasons && filteredSeasons.length !==0) {
            console.log(' [SeasonList] filtered success');
            setSeasons(filteredSeasons);
        }
        else{
            console.log(' [SeasonList] filtered failure');
       //     setSeasons([]);
        }
    }


    return (
        <div className="list row">
            <SearchSeason
                onLoadSeasons={onLoadFilteredSeasons}
            />

            <div className="col-md-6">
                <h4>Seasons List</h4>
                <ul className="list-group">
                    {seasons && seasons.map((season, index) => (
                        <li  key={season.membership_year} className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveSeason(season, index)}

                        >
                            {season.membership_name}
                        </li>
                    ))}
                </ul>
                <Link to={"/addSeason/"} className="btn btn-warning m-2">
                    Add
                </Link>
            </div>
            <div className="col-md-6">
                {currentSeason ? (
                    <ReadSeason season={currentSeason}/>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Season...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default SeasonList;
