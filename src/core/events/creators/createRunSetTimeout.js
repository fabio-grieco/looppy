import {eventKinds} from "../kinds.js";

export function createRunSetTimeoutEvent(nodeId, timeout, callback, loc) {
    return {
        kind: eventKinds.RUN_SET_TIMEOUT,
        nodeId,
        timeout,
        callback,
        loc,
    }
}