import {eventKinds} from "../kinds.js";

export function createResolvedPromise(callbackName, blockBodyNodeId, triggererNodeId, blockBody) {
    return {
        kind: eventKinds.RESOLVED_PROMISE,
        callbackName,
        blockBodyNodeId,
        triggererNodeId,
        blockBody,
    }
}