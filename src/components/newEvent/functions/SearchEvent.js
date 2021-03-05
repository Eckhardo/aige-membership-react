import React, {useState} from "react";


const SearchEvent = ({findByEventName, refreshList}) => {

    const [eventName, setEventName] = useState('');

    const onChangeSearchEvent = e => {
        const eventName = e.target.value;
        setEventName(eventName);
        console.log('seasonYear:', eventName);
    };

    return (
        <div className="col-md-8">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by event name"
                    value={eventName}
                    onChange={onChangeSearchEvent}
                />
                <div className="input-group-append">
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={ () => findByEventName(eventName)}
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

export default   React.memo(SearchEvent);
