import {nodeId} from "../instrumentation.js";
import {eventKinds} from "../../events/kinds.js";
import {createStartedRunningSyncStatementEvent} from "../../events/creators/createStartedRunningSyncStatement.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createPostMessageCall} from "../common/instrumentationUtils.js";

function checkExistsSelector({expression}) {
    function getObjectName() {
        return expression?.callee?.object?.callee?.object?.name;
    }

    function getMethodName() {
        return expression?.callee?.object?.callee?.property?.name;
    }

    if (!(getObjectName() === "document" && getMethodName() === "querySelector")) {
        throw Error("Missing 'document.querySelector' before 'addEventListener' expression.")
    }
}

export const instrumentButtonClick = (parser, generator) => (node) => {
    const contentForCallStack = `${generator.generate(node.expression.callee)}()`

    function turnIntoAPostMessageCall(node) {
        const loc = node.loc
        node.expression.callee = {
            "type": "Identifier",
            "name": "postMessage",
            "loc": node.callee?.loc,
        }

        const modifiedCall = `postMessage({kind: "${eventKinds.EVENT_DISPATCHED_FROM_JS}", element: '#myButton', type: 'click'}); const e = new Event('message'); e.data ={kind: 'user-event', element: '#myButton', eventKind: 'click'}; dispatchEvent(e)`;
        node.expression = parser.parse(modifiedCall)
        const beforeMessage = createPostMessageCall(createStartedRunningSyncStatementEvent(contentForCallStack, node[nodeId], loc))
        const afterMessage = createPostMessageCall(createEndedFunctionExecution(contentForCallStack, node[nodeId]))
        node.expression.body = [
            parser.parse(beforeMessage),
            ...node.expression.body,
            parser.parse(afterMessage)
        ]
    }

    node[nodeId] = node["nodeId"]
    checkExistsSelector(node);
    turnIntoAPostMessageCall(node);
    return node
};
