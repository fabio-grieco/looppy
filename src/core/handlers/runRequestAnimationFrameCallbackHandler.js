import {pushToCallStack, removeAnimationByNodeId} from "../store/updaters.js";

function dequeueAnimation(state, event) {
    removeAnimationByNodeId(state, event.triggererNodeId)
    state.eventLoopQueuePopCount++;
}

function runAnimation(state, event) {
    state.runningNodeLoc = event.loc;
    pushToCallStack(state, {nodeId: event.blockBodyNodeId, content: event.callbackName, info: {isCallback: true, isAsync: true}})
}

export function handleRunRequestAnimationFrameCallback(state, event) {
    dequeueAnimation(state, event);
    runAnimation(state, event);
}