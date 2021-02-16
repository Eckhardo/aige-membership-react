import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import SeasonService from "../../services/SeasonService";

import Seasons from "./functions/Seasons";

import SearchSeason from "./functions/SearchSeason";

const SeasonList = () => {
    const [seasons, setSeasons] = useState([]);
 const [error, setError] =useState('');
    // combines componentDidMount and componentDidUpdate
    useEffect(() => {
        console.log(' [SeasonList] useEffect retrieveSeasons()');
        setError('');
        retrieveSeasons();
    }, []);


    const retrieveSeasons = () => {
        SeasonService.getAll().then(response => {
            setSeasons(response.data);
            setError('');
        })
            .catch(e => {
                console.log(e);
            });
    };

    const findBySeasonYear = (year) => {
        SeasonService.get(year)
            .then(response => {
                console.log(' [SeasonList] findBySeasonYear searchSeason()');
                setSeasons([response.data]);

            })
            .catch(e => {
                console.log(e);
                setError(JSON.stringify(e.message));
            });
    };


    const refreshList = () => {
        setError('');
        retrieveSeasons();
    }


    return (
        <div className="list row">
            <SearchSeason
                findBySeasonYear={findBySeasonYear}
                refreshList={refreshList}
            />
            <Seasons seasons={seasons}/>
            {error ? (<div>{error}</div>) : null}
        </div>



    );
}
export default SeasonList;
