import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {useTransitionGroup} from "../hooks/useTransitionGroup.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Code from "../../Code.jsx";

function AnimationQueue() {
    const {value} = useSnapshot(state)
    const {items, timeoutMs} = useTransitionGroup(value.queues.animationQueue)

    return <TransitionGroup className="queue">
        <div className="title"> Animation Queue</div>
        {items.map(({nodeId, content, nodeRef}) => {
            return <CSSTransition
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

export default AnimationQueue