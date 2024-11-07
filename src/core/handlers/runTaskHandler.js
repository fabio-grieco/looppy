import {enqueueTask, pushToCallStack, removeTaskByNodeId, removeTimerByNodeId} from "../store/updaters.js";

function dequeueTask(state, event) {
    removeTaskByNodeId(state, event.triggererNodeId);
    state.eventLoopQueuePopCount++;
}

function clearTimer(state, event) {
    const timerId = state.webApis.timers.find(timer => timer.nodeId === event.triggererNodeId).timerId;
    if (timerId) {
        window.clearTimeout(timerId);
    }
    removeTimerByNodeId(state, event.triggererNodeId);
}

function handleTimer(state, event) {
    const timerIsStillRunning = state.webApis.timers.map(timer => timer.nodeId).includes(event.triggererNodeId);
    if (timerIsStillRunning) {
        clearTimer(state, event);
        enqueueTask(state, {nodeId: event.triggererNodeId, callbackName: event.callbackName})
    }
}

export function handleRunTask(state, event) {
    const {callbackName, blockBodyNodeId, loc} = event;
    handleTimer(state, event);
    queueMicrotask(() => {
        dequeueTask(state, event);
        state.runningNodeLoc = loc;
        pushToCallStack(state, {
            nodeId: blockBodyNodeId,
            content: callbackName,
            info: {isCallback: true, isAsync: true}
        });
    })
}
