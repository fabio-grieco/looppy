import {useSnapshot} from "valtio";
import {state} from "../../../adapters/state.js";
import "./Console.css";

function Console() {
    const {value} = useSnapshot(state)

    return <div className="console">
        <div className="title">Console</div>
        <pre className="console-content">
        <ul>
            {value.console.map(({content}, index) => <li key={index}>{content}</li>)}
        </ul>
        </pre>
    </div>
}

export default Console