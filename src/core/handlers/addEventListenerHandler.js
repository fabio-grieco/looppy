export function handleAddedEventListener(state, event) {
    if (state.webApis.eventListeners[event.eventTarget] === undefined) {
        state.webApis.eventListeners = {
            [event.eventTarget]: {}
        }
    }

    if (state.webApis.eventListeners[event.eventTarget][event.eventType] === undefined) {
        state.webApis.eventListeners[event.eventTarget] = {
            [event.eventType]: []
        }
    }

    state.webApis.eventListeners[event.eventTarget][event.eventType].push({
        nodeId: event.nodeId,
        callback: event.callback,
    })
}