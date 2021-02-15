import React, {Component} from "react";
import EventService from "../../services/EventService";
import SeasonEvent from "./Event";

class EventList extends Component {

    state = {
        events: []
    }

    componentDidMount() {
        EventService.getAll().then(response => {
            this.setState({events: response.data});
            console.log(response.data);
        }).catch(e => {
            console.log(e);
        });
    }

    render() {
        const posts = this.state.events.map(myEvent => {
            return <SeasonEvent key={myEvent.event_name} event={myEvent.PK}/>
        })


        return (
            <>
            <div>EventList</div>
                {posts}
                </>

        )
    }

}

export default EventList;
