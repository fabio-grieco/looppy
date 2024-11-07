import {removeMicrotaskByNodeId, pushToCallStack} from "../store/updaters.js";

function dequeueMicrotask(state, event) {
    if (state.queues.microtaskQueue.length === 0) {
        return;
    }
    removeMicrotaskByNodeId(state, event.triggererNodeId);
    state.eventLoopQueuePopCount++;
}

function runMicrotask(state, event) {
    const {callbackName, blockBodyNodeId, loc} = event;
    state.runningNodeLoc = loc;
    pushToCallStack(state, {nodeId: blockBodyNodeId, content: callbackName, info: {isCallback: true, isAsync: true}})
}

export function handleRunMicrotask(state, event) {
    dequeueMicrotask(state, event);
    runMicrotask(state, event);
}