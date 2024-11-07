import {nodeId} from "../instrumentation.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {getCallback, getCallbackTextIdentifier, isArrowFunction} from "./instrumentationUtils.js";

function getCallbackLoc(callback) {
    return isArrowFunction(callback) ? callback.loc : callback.id.loc;
}

function createBlockStatement(callbackBlock) {
    return {
        type: "BlockStatement",
        nodeId: callbackBlock.nodeId,
        body: [{
            expression: callbackBlock,
            loc: callbackBlock.loc,
            type: "ExpressionStatement",
        }],
    }
}

function makeCallbackNotAnExpression(callback) {
    callback.expression = false
}

export const instrumentCallback = (parser, generator) => (node, instrumentNode, runCallbackEventCreator) => {
    const callback = getCallback(node)
    const callbackIdentifier = getCallbackTextIdentifier(generator, callback)
    const isCallbackBodyAnExpression = callback.body.type !== "BlockStatement";
    if (isCallbackBodyAnExpression) {
        makeCallbackNotAnExpression(callback)
        callback.body = createBlockStatement(callback.body)
    }
    const callbackBody = callback.body
    callbackBody[nodeId] = callbackBody["nodeId"]
    callbackBody.body = callbackBody.body.flatMap(instrumentNode)
    const loc = getCallbackLoc(callback)
    const blockBody = generator.generate(callbackBody).replaceAll("\n", "");
    const beforeMessage = `postMessage(${JSON.stringify(runCallbackEventCreator(callbackBody[nodeId], node[nodeId], callbackIdentifier, blockBody, loc))});`;
    const afterMessage = `postMessage(${JSON.stringify(createEndedFunctionExecution(callbackIdentifier, callbackBody[nodeId]))});`;
    callbackBody.body.unshift(parser.parse(beforeMessage))
    callbackBody.body.push(parser.parse(afterMessage))
    return node
}