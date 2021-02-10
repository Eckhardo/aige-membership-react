import React from "react";


const SearchSeason = ({seasonYear, onChangeSearchSeason, findBySeasonYear, refreshList}) => {

    return(
        <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by season year"
                    value={seasonYear}
                    onChange={onChangeSearchSeason}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findBySeasonYear}
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

    )
}

export default   React.memo(SearchSeason);
