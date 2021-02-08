import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import SeasonService from "../../services/SeasonService";

import ReadSeason from "./functions/ReadSeason";

import SearchSeason from "./functions/SearchSeason";

const SeasonList = () => {
    const [seasons, setSeasons] = useState([]);
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [seasonYear, setSeasonYear] = useState('');


    useEffect(() => {
        console.log('retrieveSeasons');
        retrieveSeasons();
    }, []);


    const onChangeSearchSeason = e => {
        const seasonName = e.target.value;
        setSeasonYear(seasonName);
        console.log('seasonYear:',seasonName);
    };
    const retrieveSeasons = () => {
        SeasonService.getAll().then(response => {
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
        setSeasonYear('');
    };

    const setActiveSeason = (season, index) => {
        setCurrentSeason(season);
        setCurrentIndex(index);
    };

    const findBySeasonYear = () => {
        console.log('season name:', seasonYear);
        SeasonService.get(seasonYear).then(response => {
                 setSeasons([response.data]);
            })
            .catch(e => {
                console.log('findBySeasonYear: ',e);
             });
    };

    return (
        <div className="list row">

           <SearchSeason
           seasonYear={seasonYear}
           onChangeSearchSeason={onChangeSearchSeason}
           findBySeasonYear={findBySeasonYear}
           refreshList={refreshList}
           />

            <div className="col-md-6">
                <h4>Seasons List</h4>
                <ul className="list-group">
                    {seasons &&
                    seasons.map((season, index) => (
                        <li  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                            onClick={() => setActiveSeason(season, index)}
                            key={season.PK}
                        >
                            {season.membership_name}
                        </li>
                    ))}
                </ul>
                <Link to={"/addSeason/"} className="btn btn-warning m-2" >
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
