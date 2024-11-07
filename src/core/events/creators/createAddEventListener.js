import {eventKinds} from "../kinds.js";

export function createAddEventListener(nodeId, eventTarget, eventType, callback) {
    return {
        kind: eventKinds.ADD_EVENT_LISTENER,
        nodeId,
        eventTarget,
        eventType,
        callback,
    }
}