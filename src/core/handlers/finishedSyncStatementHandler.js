export function handleFinishedSyncStatement(state) {
    state.callStack.shift()
    state.runningNodeLoc = null
}