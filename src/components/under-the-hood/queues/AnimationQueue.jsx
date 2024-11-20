import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Code from "../../Code.jsx";

function AnimationQueue() {
    const {value} = useSnapshot(state)

    return <TransitionGroup className="queue">
        <div className="title"> Animation Queue</div>
        {value.queues.animationQueue.map(({nodeId, content, nodeRef}) => {
            return <CSSTransition
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

export default AnimationQueue