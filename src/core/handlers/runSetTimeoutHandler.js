import {enqueueTask, removeTimerByNodeId} from "../store/updaters.js";

function addTimer(state, event, timerId) {
    state.webApis.timers.push({
        nodeId: event.nodeId,
        timeout: event.timeout,
        callback: event.callback,
        timerId: timerId,
    })
}

function enqueueTimerTask(state, event) {
    const expiredTimer = state.webApis.timers.find(timer => timer.nodeId === event.nodeId)
    removeTimerByNodeId(state, event.nodeId);
    if (expiredTimer) {
        enqueueTask(state, {nodeId: event.nodeId, callbackName: event.callback})
    }
}

export function handleRunSetTimeout(state, event) {
    state.runningNodeLoc = event.loc;
    if (event.timeout === 0) {
        enqueueTask(state, {nodeId: event.nodeId, callbackName: event.callback})
        return;
    }
    const timerId = setTimeout(() => {
        enqueueTimerTask(state, event);
    }, event.timeout)
    addTimer(state, event, timerId);
}