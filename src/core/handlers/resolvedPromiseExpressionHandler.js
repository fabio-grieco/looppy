import {enqueueMicrotask} from "../store/updaters.js";

export function handleResolvedPromise(state, event) {
    const {triggererNodeId} = event;
    state.webApis.promises.findLast(promise => promise.nodeId === triggererNodeId).status = "Fulfilled";
    queueMicrotask(() => {
        enqueueMicrotask(state, {nodeId: triggererNodeId, callbackName: event.callbackName})
    })
}