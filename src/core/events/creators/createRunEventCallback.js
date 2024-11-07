import {eventKinds} from "../kinds.js";

export function createRunEventCallbackEvent(blockBodyNodeId, triggererNodeId, callbackName, blockBody, loc) {
    return {
        kind: eventKinds.RUN_EVENT_CALLBACK,
        blockBodyNodeId,
        triggererNodeId,
        callbackName,
        blockBody,
        loc,
    }
}