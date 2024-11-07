import {useSnapshot} from "valtio";
import {state} from "../adapters/state.js";
import {isInThePast} from "../core/store/historySelectors.js";

function Button() {
    const {value, history} = useSnapshot(state)

    return <div className={"page"}>
        <button id="myButton" disabled={isInThePast(history)} onClick={() => console.log('foo')}>Click me</button>
    </div>
}

export default Button
