import Timers from "./Timers.jsx";
import Promises from "./Promises.jsx";
import EventListeners from "./EventListeners.jsx";
import "./WebApis.css"

function WebApis() {
    return <div className="web-apis">
        <div className="title"> Web APIs</div>
        <Timers/>
        <Promises/>
        <EventListeners/>
    </div>
}

export default WebApis