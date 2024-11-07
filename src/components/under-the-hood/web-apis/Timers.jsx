import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import Code from "../../Code.jsx";
import {useTransitionGroup} from "../hooks/useTransitionGroup.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";

function Timers() {
    const {value} = useSnapshot(state)
    const {items, timeoutMs} = useTransitionGroup(value.webApis.timers)

    return <TransitionGroup className="timers">
        {items.map(({callback, timeout, nodeRef}, index) => {
            return <CSSTransition
                in={true}
                key={index}
                nodeRef={nodeRef}
                timeout={{
                    enter: timeoutMs,
                    exit: timeoutMs,
                }}
                classNames="item"
                unmountOnExit
            >
                <div key={index}
                     className="item">
                    <div className="item-property">
                        <div>Timeout</div>
                        <div>
                            <pre>{timeout}</pre>
                        </div>
                    </div>
                    <div className="item-property">
                        <div>Callback</div>
                        <div><Code>{callback}</Code></div>
                    </div>
                </div>
            </CSSTransition>;
        })}

    </TransitionGroup>
}

export default Timers