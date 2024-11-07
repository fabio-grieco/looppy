import {nodeId} from "../instrumentation.js";
import {createRunTimerCallbackEvent} from "../../events/creators/createRunTimerCallback.js";
import {createRunSetTimeoutEvent} from "../../events/creators/createRunSetTimeout.js";
import {instrumentCallback} from "../common/instrumentCallback.js";
import {createPostMessageCall, getCallback, getCallbackTextIdentifier} from "../common/instrumentationUtils.js";

function getTimeout(expression) {
    return expression.expression.arguments[1].value;
}

export const instrumentSetTimeout = (parser, generator) => (node, instrumentNode) => {
    const instrumentTimerCallback = instrumentCallback(parser, generator)
    node[nodeId] = node["nodeId"]
    const loc = node.loc
    const callback = getCallback(node)
    const callbackIdentifier = getCallbackTextIdentifier(generator, callback)
    const timeout = getTimeout(node)
    const beforeMessage = createPostMessageCall(createRunSetTimeoutEvent(node[nodeId], timeout, callbackIdentifier, loc))
    return [
        parser.parse(beforeMessage),
        instrumentTimerCallback(node, instrumentNode, createRunTimerCallbackEvent)
    ]
}


