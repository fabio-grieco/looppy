import {getEventListeners} from "../store/selectors.js";
import {enqueueTask} from "../store/updaters.js";

export function handleDOMEvent(state, event) {
    const {element, type} = event;
    const listeners = getEventListeners(state, element, type)
    for (const listener of listeners) {
        enqueueTask(state, {nodeId: listener.nodeId, callbackName: listener.callback})
    }
}
