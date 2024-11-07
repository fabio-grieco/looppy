import {eventKinds} from "../kinds.js";

export function createRunRafCallback(blockBodyNodeId, triggererNodeId, callbackName, blockBody, loc) {
    return {
        kind: eventKinds.RUN_RAF_CALLBACK,
        blockBodyNodeId,
        triggererNodeId,
        callbackName,
        blockBody,
        loc,
    }
}