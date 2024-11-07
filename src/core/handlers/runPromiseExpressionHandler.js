import {pushToCallStack} from "../store/updaters.js";

export function handleRunPromiseExpression(state, event) {
    state.runningNodeLoc = event.loc;
    pushToCallStack(state, {nodeId: event.nodeId, content: event.runFunction, info: { isCallback: true, isAsync: false }})
    state.webApis.promises.push({
        nodeId: event.nodeId,
        callback: event.callback,
        status: "Pending"
    })
}