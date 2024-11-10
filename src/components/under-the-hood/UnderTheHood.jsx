import PropTypes from "prop-types";
import "./UnderTheHood.css"
import CallStack from "./call-stack/CallStack.jsx";
import WebApis from "./web-apis/WebApis.jsx";
import Queues from "./queues/Queues.jsx";
import EventLoop from "./event-loop/EventLoop.jsx";

function UnderTheHood() {
    return <div className="under-the-hood">
        <div className="row">
            <div className="call-stack-section">
                <CallStack/>
            </div>
            <div className="web-apis-section">
                <WebApis/>
            </div>
        </div>
        <div className="row">
            <div className="event-loop-section">
                <EventLoop/>
            </div>
            <Queues/>
        </div>
    </div>
}

export default UnderTheHood

UnderTheHood.propTypes = {
    parseTree: PropTypes.object
}