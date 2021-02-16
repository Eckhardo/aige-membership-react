import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import ReadSeason from "./ReadSeason";

const ListSeasons = ({seasons}) => {
    const [currentSeason, setCurrentSeason] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);


    useEffect(()=>{
        console.log('[ListSeasons]::useEffect')
    },[seasons])
    const setActiveSeason = (season, index) => {
        setCurrentSeason(season);
        setCurrentIndex(index);
    }
    return (

        <>
            <div className="col-md-6">
                <h4>Seasons List</h4>
                <ul className="list-group">
                    {seasons && seasons.map((season, index) => (
                        <li key={season.membership_year}
                            className={"list-group-item " + (index === currentIndex ? "active" : "")}
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
        </>

    )

}

export default ListSeasons;
