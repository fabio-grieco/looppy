import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTransitionGroup} from "../hooks/useTransitionGroup.js";
import Code from "../../Code.jsx";

function TaskQueue() {
    const {value} = useSnapshot(state)
    const {items, timeoutMs} = useTransitionGroup(value.queues.taskQueue)

    return <TransitionGroup className="queue">
        <div className="title"> Task Queue</div>
            {items.map(({nodeId, content, nodeRef}) => {
                return <CSSTransition
                    in={true}
                    key={nodeId}
                    nodeRef={nodeRef}
                    timeout={{
                        enter: timeoutMs,
                        exit: timeoutMs,
                    }}
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