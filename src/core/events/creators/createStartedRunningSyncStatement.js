import {eventKinds} from "../kinds.js";

export function createStartedRunningSyncStatementEvent(statementName, blockBodyNodeId, loc) {
    return {
        kind: eventKinds.STARTED_RUNNING_SYNC_STATEMENT,
        statementName,
        blockBodyNodeId,
        loc,
    }
}