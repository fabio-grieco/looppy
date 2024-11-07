import {eventKinds} from "../kinds.js";

export function createRunPromiseCallbackEvent(blockBodyNodeId, triggererNodeId, callbackName, blockBody, loc) {
    return {
        kind: eventKinds.RUN_PROMISE_CALLBACK,
        blockBodyNodeId,
        triggererNodeId,
        callbackName,
        blockBody,
        loc,
    }
}