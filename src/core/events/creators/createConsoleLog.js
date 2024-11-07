import {eventKinds} from "../kinds.js";

export function createConsoleLog(nodeId, content, loc) {
    return {
        kind: eventKinds.CONSOLE_LOG,
        nodeId,
        content,
        loc,
    }
}