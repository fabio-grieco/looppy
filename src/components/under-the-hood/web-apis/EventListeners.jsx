import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import Code from "../../Code.jsx";
import {Fragment} from "react";

function EventListeners() {
    const {value} = useSnapshot(state)

    function renderEventListeners([eventType, listeners]) {
        return <div key={eventType}
                    className="item-section">
            <div className="item-property">
                <div>Event</div>
                <pre>👀 {eventType}</pre>
            </div>
            <div className="item-property">
                <div>Listeners</div>
                <pre>{listeners.map(({nodeId, callback}) => <Fragment key={nodeId.toString()}><Code>{callback}</Code> </Fragment>)}</pre>
            </div>
        </div>
    }

    function renderElementListeners([element, events]) {
        return <div key={element}
                    className="item">
            <div className="item-property">
                <div>Element</div>
                <pre>{element}</pre>
            </div>
            {Object.entries(events).map(renderEventListeners)}
        </div>
    }

    return <div className="event-listeners">
        {Object.entries(value.webApis.eventListeners).map(renderElementListeners)}</div>
}

export default EventListeners