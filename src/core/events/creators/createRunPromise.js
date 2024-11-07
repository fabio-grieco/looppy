import {eventKinds} from "../kinds.js";

export function createRunPromise(nodeId, runFunction, callback, loc) {
    return {
        kind: eventKinds.RUN_PROMISE,
        nodeId,
        runFunction,
        callback,
        loc,
    }
}