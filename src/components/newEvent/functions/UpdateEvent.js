import React, {useEffect, useState} from 'react';

import {Link} from 'react-router-dom';
import ErrorBoundary from "../../../ErrorBoundary/ErrorBoundary";
import EventForm from "./EventForm";
import EventService from "../../../services/EventService";

const UpdateEvent = props => {
    const initialUserState = {
        event_name: "",
        event_short: ""
    };
    const [currentEvent, setCurrentEvent] = useState(initialUserState);
    const [message, setMessage] = useState("");

    useEffect(() => {
        console.log('[UpdateEvent]useEffect', props.match.params.event_short);
        getEvent(props.match.params.event_short);
    }, [props.match.params.event_short]);

    const getEvent = event_short => {
         EventService.get(event_short)
            .then(response => {
                setCurrentEvent(response.data);
            })
            .catch(e => {
                console.error(e);
            });
    };

    const handleInputChange = event => {
        const {name, value} = event.target;
        setCurrentEvent({...currentEvent, [name]: value});
    };


    const updateEvent = () => {
        EventService.update(currentEvent).then(response => {
            props.history.push("/events");
        })
            .catch(e => {
                if (e.response.data) {
                    setMessage(e.response.data);
                    console.error('error :', e);
                } else {
                    setMessage(e.m);
                    console.error('error:', e);
                }
            });
    };

    const deleteEvent = () => {
        EventService.remove(currentEvent.SK).then(response => {
            props.history.push("/events");
        })
            .catch(e => {
                console.error(e);
            });
    };

    return (
        <div className="text-center">
            <h4>Current Event {currentEvent.event_short}</h4>

                <EventForm
                    myEvent={currentEvent}
                    handleInputChange={handleInputChange}
               />
            {message ? (<div>{message}</div>) : null}
            <div className="submit-form border border-success mt-2">
                <Link
                    to={"/events/"}
                    className="btn btn-warning mr-2 mt2">
                    List
                </Link>
                <button className="btn btn-danger mr-2 mt2" onClick={deleteEvent}>
                    Delete
                </button>
                <button
                    type="submit"
                    className="btn btn-success ml-2 mt2"
                    onClick={updateEvent}>
                    Update
                </button>
            </div>
        </div>);
}


export default UpdateEvent;
