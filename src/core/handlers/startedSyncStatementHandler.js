import {pushToCallStack} from "../store/updaters.js";

export function handleStartedSyncStatement(state, event) {
    const {blockBodyNodeId, statementName, loc} = event;
    state.runningNodeLoc = loc;
    pushToCallStack(state, {nodeId: blockBodyNodeId, content: statementName});
}