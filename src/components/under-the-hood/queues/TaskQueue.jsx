import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Code from "../../Code.jsx";

function TaskQueue() {
    const {value} = useSnapshot(state)

    return <TransitionGroup className="queue">
        <div className="title"> Task Queue</div>
        {value.queues.taskQueue.map(({nodeId, content, nodeRef}) => {
            return <CSSTransition
                in={true}
                key={nodeId}
                nodeRef={nodeRef}
                timeout={300}
                classNames="item"
                unmountOnExit
            >
                <div key={nodeId}>
                    <Code key={nodeId}>{content}</Code>
                </div>
            </CSSTransition>;
        })}
    </TransitionGroup>
}

export default TaskQueue