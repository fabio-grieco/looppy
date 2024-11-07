import {enqueueAnimation} from "../store/updaters.js";

export function handleRunRequestAnimationFrame(state, event) {
    state.runningNodeLoc = event.loc;
    enqueueAnimation(state, {nodeId: event.nodeId, callbackName: event.callback})
}