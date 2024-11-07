import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useTransitionGroup} from "../hooks/useTransitionGroup.js";
import Code from "../../Code.jsx";

function Promises() {
    const {value} = useSnapshot(state)
    const {items, timeoutMs} = useTransitionGroup(value.webApis.promises)

    function renderStatus(status) {
        const mapStatusToEmoji = {
            Pending: '⏳',
            Fulfilled: '✅',
            Rejected: '❌'
        }

        return <div>{mapStatusToEmoji[status]} {status}</div>
    }

    return <TransitionGroup className="promises">
        {items.map(({callback, status, nodeRef}, index) => {
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
                        <div>Status</div>
                        <div>
                            <pre>{renderStatus(status)}</pre>
                        </div>
                    </div>
                    <div className="item-property">
                        <div>onFulfilled</div>
                        <div><Code>{callback}</Code></div>
                    </div>
                </div>
            </CSSTransition>;
        })}

    </TransitionGroup>

}

export default Promises