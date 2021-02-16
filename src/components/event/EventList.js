import React, {Component} from "react";
import EventService from "../../services/EventService";
import SeasonEvent from "./Event";
import NewEvent from "./NewEvent";

import ModifyEvent from './ModifyEvent';
class EventList extends Component {

    state = {
        events: [],
        selectedEventName: ''
    }

    componentDidMount() {
        EventService.getAll().then(response => {
            this.setState({events: response.data});
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    eventSelectHandler = (name) => {
        console.log('selectedEventName:', name);
        this.setState({selectedEventName: name});
    }

    render() {
        let myEvents = this.state.events.map(theEvent => {
            return <SeasonEvent
                key={theEvent.event_short}
                name={theEvent.event_name}
                short={theEvent.event_short}
                clicked={() => this.eventSelectHandler(theEvent.event_short)}/>;
        });


        return (
            <div>
                <section className="EventList">
                    {myEvents}
                </section>
                <section>
                    <ModifyEvent name={this.state.selectedEventName}/>
                </section>
                <section>
                    <NewEvent/>
                </section>
            </div>
        )
    }

}

export default EventList;
