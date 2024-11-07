import {eventKinds} from "../kinds.js";

export function createEndedFunctionExecution(statementName, nodeId) {
    return {
        kind: eventKinds.ENDED_FUNCTION_EXECUTION,
        statementName,
        nodeId
    }
}