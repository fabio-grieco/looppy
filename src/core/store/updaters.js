export function pushToCallStack(state, {nodeId, content, info = {isCallback: false, isAsync: false}}) {
    state.callStack.unshift({nodeId, content, info})
}

export function writeToConsole(state, {content}) {
    state.console.push({content})
}

export function removeMicrotaskByNodeId(state, nodeId) {
    state.queues.microtaskQueue = state.queues.microtaskQueue.filter(mt => mt.nodeId !== nodeId);
}

export function removeTaskByNodeId(state, nodeId) {
    state.queues.taskQueue = state.queues.taskQueue.filter(t => t.nodeId !== nodeId);
}

export function removeAnimationByNodeId(state, nodeId) {
    state.queues.animationQueue = state.queues.animationQueue.filter(a => a.nodeId !== nodeId);
}

export function enqueueTask(state, {nodeId, callbackName}) {
    state.queues.taskQueue.push({nodeId: nodeId, content: callbackName})
}

export function enqueueMicrotask(state, {nodeId, callbackName}) {
    state.queues.microtaskQueue.push({nodeId: nodeId, content: callbackName})
}

export function enqueueAnimation(state, {nodeId, callbackName}) {
    state.queues.animationQueue.push({nodeId: nodeId, content: callbackName})
}

export function removeTimerByNodeId(state, nodeId) {
    state.webApis.timers = state.webApis.timers.filter(timer => timer.nodeId !== nodeId)
}
