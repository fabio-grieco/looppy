import {eventKinds} from "../kinds.js";

export function createRunTimerCallbackEvent(blockBodyNodeId, triggererNodeId, callbackName, blockBody, loc) {
    return {
        kind: eventKinds.RUN_TIMER_CALLBACK,
        blockBodyNodeId,
        triggererNodeId,
        callbackName,
        blockBody,
        loc,
    }
}