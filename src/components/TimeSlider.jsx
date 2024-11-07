import "./TimeSlider.css"
import {useSnapshot} from "valtio";
import {state} from "../adapters/state.js";
import {useEffect, useState} from "react";
import {isRunning} from "../core/store/selectors.js";
import {isInThePast} from "../core/store/historySelectors.js";

function TimeSlider() {
    const {value, undo, redo, history} = useSnapshot(state)
    const [timeMarker, setTimeMarker] = useState(0)
    const disabled = isRunning(value) && !isInThePast(history)
    useEffect(() => {
        setTimeMarker(history.nodes.length)
    }, [history.nodes.length]);

    function handleSlide(e) {
        setTimeMarker(prev => {
            const newTimeMarker = parseInt(e.target.value)
            if (newTimeMarker > prev) {
                for (let i = prev; i < newTimeMarker; i++) {
                    redo()
                }
            } else {
                for (let i = prev; i > newTimeMarker; i--) {
                    undo()
                }
            }
            return newTimeMarker
        })
    }

    function handleBackward() {
        setTimeMarker(prev => {
            if (prev > 0) {
                undo()
                return prev - 1
            }
            return prev
        })
    }

    function handleForward() {
        setTimeMarker(prev => {
            if (prev < history.nodes.length) {
                redo()
                return prev + 1
            }
            return prev
        })
    }

    return <div className={"time-slider"}>
        <button onClick={handleBackward}>↩️</button>
        <input type="range" disabled={disabled} value={timeMarker.toString()} min="1" max={history.nodes.length} onChange={handleSlide}/>
        <button onClick={handleForward}>↪️</button>
    </div>
}

export default TimeSlider
