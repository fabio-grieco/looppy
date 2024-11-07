import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import "./CallStack.css";
import CallStackItem from "./CallStackItem.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTransitionGroup} from "../hooks/useTransitionGroup.js";

function CallStack() {
    const {value} = useSnapshot(state)
    const {items, timeoutMs} = useTransitionGroup(value.callStack)

    return <>
        <div className="title"> Call Stack</div>
        <TransitionGroup className="call-stack">
            {items.map(({nodeId, content, info, nodeRef}) => {
                    return <CSSTransition
                        key={nodeId}
                        nodeRef={nodeRef}
                        timeout={{
                            enter: timeoutMs + (info.isAsync ? timeoutMs : 0),
                            exit: timeoutMs,
                        }}
                        classNames="item"
                        unmountOnExit
                    >
                        <CallStackItem key={nodeId} content={content} info={info}/>
                    </CSSTransition>;
                }
            )}
        </TransitionGroup>
    </>
}

export default CallStack