import React, {useState} from "react";
import EventService from "../../../services/EventService";
import EventForm from "./EventForm";

const AddEvent = (props) => {
    const initialState = {
        event_name: "",
        event_short: ""

    }

    const [newEvent, setNewEvent] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState('');

    const saveEvent = () => {
        EventService.create(newEvent).then(response => {
            props.history.push("/events");
        }).catch(error => {
            console.log(error);
            setErrorMessage(error.message);


        })
    }
    const handleInputChange = event => {
        const {name, value} = event.target;
        setNewEvent({...newEvent, [name]: value});
    };


    const refreshList = () => {
        setNewEvent(initialState);
    }
    return (
        <div>
            <div className="text-center">
                <h4>Add new Event:</h4>
                {errorMessage ? (<div>{errorMessage}</div>) : null}
                <EventForm
                    myEvent={newEvent}
                    handleInputChange={handleInputChange}
                />
                <button onClick={saveEvent} className="btn btn-success ml-5">
                    Submit
                </button>
                <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={refreshList}>

                    Clear
                </button>
            </div>
        </div>

    )
}
export default AddEvent;
