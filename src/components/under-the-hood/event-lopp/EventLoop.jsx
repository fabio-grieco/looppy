import './EventLoop.css'
import {useEffect, useRef, useState} from "react";
import {state} from "../../../adapters/state.js";
import {useSnapshot} from "valtio";
import eventLoopSvg from "../../../assets/loop.svg";

function EventLoop() {
    const spinnerRef = useRef(null)
    const {value} = useSnapshot(state)
    const prevCounterRef = useRef(value.eventLoopQueuePopCount)

    useEffect(() => {
        let rotateDegrees
        const spinnerElement = spinnerRef.current;

        if (prevCounterRef.current < value.eventLoopQueuePopCount) {
            rotateDegrees = 180
        }
        if (prevCounterRef.current > value.eventLoopQueuePopCount) {
            rotateDegrees = -180
        }

        requestAnimationFrame(() => {
            spinnerElement.style.transform = `rotate(${rotateDegrees}deg)`;
            spinnerElement.style.transition = "transform 1s";
        })

        prevCounterRef.current = value.eventLoopQueuePopCount

        return () => {
            spinnerElement.style.transform = "none"
            spinnerElement.style.transition = "none"
        };
    }, [value.eventLoopQueuePopCount])

    return <div className="event-loop-wrapper">
        <img ref={spinnerRef} height={180} width={180} src={eventLoopSvg} alt="event-loop"/>
    </div>
}


export default EventLoop