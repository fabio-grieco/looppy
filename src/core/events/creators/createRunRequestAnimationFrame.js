import {eventKinds} from "../kinds.js";

export function createRunRequestAnimationFrame(nodeId, callback, loc) {
    return {
        kind: eventKinds.RUN_REQUEST_ANIMATION_FRAME,
        nodeId,
        callback,
        loc,
    }
}