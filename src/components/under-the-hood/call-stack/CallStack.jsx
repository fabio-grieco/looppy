import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import "./CallStack.css";
import CallStackItem from "./CallStackItem.jsx";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function CallStack() {
    const {value} = useSnapshot(state)

    return <>
        <div className="title"> Call Stack</div>
        <TransitionGroup className="call-stack">
            {value.callStack.map(({nodeId, content, info, nodeRef}) => {
                    return <CSSTransition
                        key={nodeId}
                        nodeRef={nodeRef}
                        timeout={{
                            enter: info.isAsync ? 600 : 300,
                            exit: 300,
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