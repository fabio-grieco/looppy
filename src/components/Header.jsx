import TimeSlider from "./TimeSlider.jsx";
import PropTypes from "prop-types";
import "./Header.css"
import {useSnapshot} from "valtio";
import {state} from "../adapters/state.js";
import {isRunning} from "../core/store/selectors.js";
import {isInThePast} from "../core/store/historySelectors.js";

function Header({onRun}) {
    const {value, history} = useSnapshot(state)
    const isProgramRunning = isRunning(value) || isInThePast(history)
    return <header>
        <div className="controls">
            <button disabled={isProgramRunning} className="run" onClick={onRun}>
                Run
            </button>
        </div>
        <TimeSlider/>
    </header>
}

Header.propTypes = {
    onRun: PropTypes.func.isRequired
}

export default Header