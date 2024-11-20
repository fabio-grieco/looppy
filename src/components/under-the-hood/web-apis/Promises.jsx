import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import Code from "../../Code.jsx";

function Promises() {
    const {value} = useSnapshot(state)

    function renderStatus(status) {
        const mapStatusToEmoji = {
            Pending: '⏳',
            Fulfilled: '✅',
            Rejected: '❌'
        }

        return <div>{mapStatusToEmoji[status]} {status}</div>
    }

    return <TransitionGroup className="promises">
        {value.webApis.promises.map(({callback, status, nodeRef}, index) => {
            return <CSSTransition
                in={true}
                key={index}
                nodeRef={nodeRef}
                timeout={300}
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