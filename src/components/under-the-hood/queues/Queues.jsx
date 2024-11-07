import TaskQueue from "./TaskQueue.jsx";
import MicrotaskQueue from "./MicrotaskQueue.jsx";
import "./Queues.css";
import AnimationQueue from "./AnimationQueue.jsx";

function Queues() {
    return <div className="queues">
        <TaskQueue/>
        <MicrotaskQueue/>
        <AnimationQueue/>
    </div>
}

export default Queues