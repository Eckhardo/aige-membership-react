import React,{useState,useEffect} from "react";
import EventService from "../../services/EventService";
import EventCollection from './functions/EventCollection'
const Events = (props) =>{
 const [events,setEvents] =useState([]);
 const [error,setError]=useState('');


 useEffect( () => {
     retrieveEvents();
     setError('');
 },[])

const retrieveEvents = () => {
     EventService.getAll().then( (response) => {
       setEvents(response.data);
       console.log(events);
     }).catch(error =>{
         setError(error.message);
         console.log(error);
     })
}



    return (
        <div>
            <EventCollection events={events}/>
            {error ? (<div>{error}</div>) : null}

        </div>

    )

}
export default Events;
