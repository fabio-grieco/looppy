import {nodeId} from "../instrumentation.js";
import {createRunPromiseCallbackEvent} from "../../events/creators/createRunPromiseCallback.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createResolvedPromise} from "../../events/creators/createResolvedPromise.js";
import {createRunPromise} from "../../events/creators/createRunPromise.js";
import {createPostMessageCall, getCallback, isArrowFunction} from "../common/instrumentationUtils.js";
import {instrumentCallback} from "../common/instrumentCallback.js";

function isPromiseObjectStaticCall(node) {
    return node.expression?.callee?.object?.callee?.object?.name === 'Promise' && node.expression?.callee?.object?.callee?.property?.name === 'resolve'
}

function getPromiseRunFunction(promiseExpression) {
    if (isPromiseObjectStaticCall(promiseExpression)) {
        return promiseExpression.expression?.callee?.object?.callee?.property.name;
    }
    return promiseExpression.expression?.callee?.object?.arguments[0];
}

function getPromiseRunFunctionName(node) {
    if (isPromiseObjectStaticCall(node)) {
        return "Promise.resolve"
    }

    return node.expression?.callee?.object?.arguments[0].id.name;
}

function getPromiseCallbackName(generator, promiseCallback) {
    return isArrowFunction(promiseCallback) ? `(${generator.generate(promiseCallback)})` : promiseCallback.id.name;
}

export const instrumentPromise = (parser, generator) => (node, instrumentNode) => {
    const instrumentPromiseCallback = instrumentCallback(parser, generator)

    function instrumentPromiseRunFunction(promiseExpression) {
        const promiseRunFn = getPromiseRunFunction(promiseExpression)
        const runFnBody = promiseRunFn.body
        runFnBody[nodeId] = runFnBody["nodeId"]
        return promiseExpression
    }

    node[nodeId] = node["nodeId"]
    const promiseCallback = getCallback(node)
    const promiseRunFn = getPromiseRunFunction(node)
    const promiseRunFnName = getPromiseRunFunctionName(node)
    const loc = node.loc
    const callbackIdentifier = getPromiseCallbackName(generator, promiseCallback)
    const beforeMessage = createPostMessageCall(createRunPromise(node[nodeId], promiseRunFnName, callbackIdentifier, loc))
    const resolvedMessage = createPostMessageCall(createResolvedPromise(callbackIdentifier, promiseRunFn[nodeId], node[nodeId], ""))
    const afterMessage = createPostMessageCall(createEndedFunctionExecution(promiseRunFnName, promiseRunFn[nodeId]))
    return [
        parser.parse(beforeMessage),
        parser.parse(resolvedMessage),
        instrumentPromiseCallback(isPromiseObjectStaticCall(node) ? node : instrumentPromiseRunFunction(node), instrumentNode, createRunPromiseCallbackEvent),
        parser.parse(afterMessage)
    ]
};
