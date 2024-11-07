import {pushToCallStack, writeToConsole} from "../store/updaters.js";

export function handleConsoleLog(state, event) {
    const {nodeId, content, loc} = event
    state.runningNodeLoc = loc;
    pushToCallStack(state, {nodeId, content: `console.log("${content}")`});
    writeToConsole(state, {content})
}