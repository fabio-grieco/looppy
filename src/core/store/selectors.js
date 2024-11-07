function isCallStackEmpty(state) {
    return state.callStack.length === 0
}

function isTaskQueueEmpty(state) {
    return state.queues.taskQueue.length === 0
}

function isMicrotaskQueueEmpty(state) {
    return state.queues.microtaskQueue.length === 0
}

function isAnimationQueueEmpty(state) {
    return state.queues.animationQueue.length === 0
}

function areAllQueuesEmpty(state) {
    return isTaskQueueEmpty(state) && isMicrotaskQueueEmpty(state) && isAnimationQueueEmpty(state)
}

function noPendingTimers(state) {
    return state.webApis.timers.length === 0
}

function noPendingPromises(state) {
    return state.webApis.promises.filter(promise => promise.status === "Pending").length === 0
}

export function isRunning(state) {
    return !isCallStackEmpty(state) || !areAllQueuesEmpty(state) || !noPendingTimers(state) || !noPendingPromises(state)
}

export function getEventListeners(state, element, eventType) {
    return state.webApis.eventListeners[element] && state.webApis.eventListeners[element][eventType];
}