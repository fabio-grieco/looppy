import {getExpressionKind} from "./common/instrumentationUtils.js";

function* idGenerator() {
    let id = 0
    while (true) {
        yield id++
    }
}

const generateNodeId = idGenerator()

function attachIdToCallback(node) {
    const callExpression = node.expression
    const callback = callExpression.arguments.find(a => a.type === "FunctionExpression" || a.type === "ArrowFunctionExpression")
    const callbackBody = callback.body
    callbackBody['nodeId'] = generateNodeId.next().value
    const newCallbackBody = callbackBody?.body || [callbackBody]
    newCallbackBody.forEach(attachIdsToNode)
    return node
}

function attachIdToAddEventListenerCallback(addEventListenerExpression) {
    const callExpression = addEventListenerExpression.expression
    const eventCallback = callExpression.arguments.find(a => a.type === "FunctionExpression")
    const eventCallbackBodyBlock = eventCallback.body
    eventCallbackBodyBlock['nodeId'] = generateNodeId.next().value
    eventCallbackBodyBlock.body.forEach(attachIdsToNode)
    return addEventListenerExpression
}

function attachIdToNode(expression) {
    expression['nodeId'] = generateNodeId.next().value
    return expression
}

const compose = (f, g) => x => f(g(x))

const mapExpressionKindToNodeAttachment = {
    "ForLoop": attachIdToNode,
    "ConsoleLog": attachIdToNode,
    "SetTimeout": compose(attachIdToCallback, attachIdToNode),
    "PromiseExpression": compose(attachIdToCallback, attachIdToNode),
    "AddEventListener": compose(attachIdToAddEventListenerCallback, attachIdToNode),
    "ButtonClick": attachIdToNode,
    "RequestAnimationFrame": compose(attachIdToCallback, attachIdToNode),
    "FunctionCall": () => attachIdsToNode,
    "Unhandled": () => {
    },
}

const attachIdsToNode = (expression) => {
    const expressionKind = getExpressionKind(expression)
    mapExpressionKindToNodeAttachment[expressionKind](expression)
    return expression
}

export function attachNodeIds(parseTree) {
    parseTree.body.forEach(node => attachIdsToNode(node))
}

