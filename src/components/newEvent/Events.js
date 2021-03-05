import React, {useEffect, useState} from "react";
import EventService from "../../services/EventService";
import EventCollection from './functions/EventCollection'
import SearchEvent from "./functions/SearchEvent";

const Events = () => {
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');


    useEffect(() => {
        retrieveEvents();
        setError('');
    }, [])

    const retrieveEvents = () => {
        EventService.getAll().then((response) => {
            setEvents(response.data);
            console.log("Events:",response.data);
        }).catch(error => {
            setError(error.message);
            console.log(error);
        })
    }

    const findByEventName = (name) => {
        EventService.get(name)
            .then(response => {
                console.log(' [SeasonList] findBySeasonYear searchSeason()');
                setEvents([response.data]);

            })
            .catch(e => {
                console.log(e);
                setError(JSON.stringify(e.message));
            });
    };


    const refreshList = () => {
        setError('');
        retrieveEvents();
    }


    return (
        <div className="list row">
            <SearchEvent
                findByEventName={findByEventName}
                refreshList={refreshList}
            />
            <EventCollection events={events}/>
            {error ? (<div>{error}</div>) : null}
        </div>

    )

}
export default Events;
