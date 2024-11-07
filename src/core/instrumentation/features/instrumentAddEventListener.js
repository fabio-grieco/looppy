import {nodeId} from "../instrumentation.js";
import {createAddEventListener} from "../../events/creators/createAddEventListener.js";
import {createRunEventCallbackEvent} from "../../events/creators/createRunEventCallback.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createStartedRunningSyncStatementEvent} from "../../events/creators/createStartedRunningSyncStatement.js";
import {createPostMessageCall} from "../common/instrumentationUtils.js";

function checkExistsSelector({expression}) {
    if (!(expression?.callee?.object?.callee?.object?.name === "document" && expression?.callee?.object?.callee?.property?.name === "querySelector")) {
        throw Error("Missing 'document.querySelector' before 'addEventListener' expression.")
    }
}

function turnIntoListenerForMessageExpression(expression) {
    expression.expression.callee = {
        "type": "Identifier",
        "name": "addEventListener",
        "loc": expression.callee?.loc,
    }

    expression.expression.arguments[0].value = `message`;
    expression.expression.arguments[0].raw = `message`;
}

function getTargetElementSelector(expression) {
    return expression.expression.callee.object.arguments[0].value;
}

function getEventCallback(eventListenerExpression) {
    return eventListenerExpression.expression.arguments[1];
}

function getEventTarget(expression) {
    return expression.expression.callee?.object?.arguments[0].value;
}

function getEventType(expression) {
    return expression.expression.arguments[0].value;
}

function getContentForCallStack(generator, expression) {
    return `${generator.generate(expression.expression.callee)}(...)`.replace("document.querySelector", "$");
}

function getEventInfo(expression) {
    const eventTarget = getEventTarget(expression)
    const eventType = getEventType(expression)
    const eventCallback = getEventCallback(expression)
    return {eventTarget, eventType, eventCallback};
}

export const instrumentAddEventListener = (parser, generator) => (node, instrumentNode) => {
    const selector = getTargetElementSelector(node);

    function decorateWithMessageDispatches(eventCallbackBodyBlock, eventCallback) {
        const loc = eventCallback.id.loc
        const beforeMessage = createPostMessageCall(createRunEventCallbackEvent(eventCallbackBodyBlock[nodeId], node[nodeId], eventCallback.id.name, generator.generate(eventCallbackBodyBlock).replaceAll("\n", ""), loc))
        eventCallbackBodyBlock.body.unshift(parser.parse(beforeMessage))
        const afterMessage = createPostMessageCall(createEndedFunctionExecution(eventCallback.id.name, eventCallbackBodyBlock[nodeId]))
        eventCallbackBodyBlock.body.push(parser.parse(afterMessage))
    }

    function editCallbackBody(eventCallbackBodyBlock) {
        const desiredCallbackBody = `
           const event = arguments[0];
           const {kind, element, eventKind} = event.data;
           if (kind === 'user-event' && element === '${selector}' && eventKind === 'click') {
              ${generator.generate(eventCallbackBodyBlock)}
           }
        `
        eventCallbackBodyBlock.body = parser.parse(desiredCallbackBody).body
    }

    function instrumentEventCallback(node) {
        const eventCallback = getEventCallback(node)
        const eventCallbackBodyBlock = eventCallback.body
        eventCallbackBodyBlock[nodeId] = eventCallbackBodyBlock["nodeId"]
        eventCallbackBodyBlock.body = eventCallbackBodyBlock.body.flatMap(instrumentNode)
        decorateWithMessageDispatches(eventCallbackBodyBlock, eventCallback);
        editCallbackBody(eventCallbackBodyBlock);
        return node
    }

    const {eventTarget, eventType, eventCallback} = getEventInfo(node);
    checkExistsSelector(node);
    node[nodeId] = node["nodeId"]
    const loc = node.loc
    const contentForCallStack = getContentForCallStack(generator, node);
    turnIntoListenerForMessageExpression(node);

    return [
        parser.parse(createPostMessageCall(createStartedRunningSyncStatementEvent(contentForCallStack, node[nodeId], loc))),
        parser.parse(createPostMessageCall(createAddEventListener(node[nodeId], eventTarget, eventType, eventCallback.id.name))),
        instrumentEventCallback(node),
        parser.parse(createPostMessageCall(createEndedFunctionExecution(contentForCallStack, node[nodeId])))
    ]
};


