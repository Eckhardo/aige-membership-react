import React, {Component} from "react";
import EventService from "../../services/EventService";

class ModifyEvent extends Component {
    state = {
        loadedEvent: null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Did update....', prevProps, prevState)

    }

    componentDidMount() {
        console.log('Did mount....')
        if (this.props.name) {
            if (!this.state.loadedEvent || (this.state.loadedEvent && this.state.loadedEvent.event_name !== this.props.name)) {
                EventService.get(this.props.name)
                    .then(response => {
                        console.log(response);
                        this.setState({loadedEvent: response.data});
                    });
            }
        }
    }

    render() {

        return (
            <div>ModifYEvent.js</div>
        )
    }
}

export default ModifyEvent;
