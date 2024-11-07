import {nodeId} from "../instrumentation.js";
import {createStartedRunningSyncStatementEvent} from "../../events/creators/createStartedRunningSyncStatement.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createPostMessageCall} from "../common/instrumentationUtils.js";

function getStatementNameInCallStack(generator, node) {
    const args = node.expression?.arguments?.map(a => a.value).join("")
    return `${node.expression?.callee?.name}(${args})`
}

export const instrumentFunctionCall = (parser, generator) => (node) => {
    node[nodeId] = node["nodeId"]
    const contentForCallStack = getStatementNameInCallStack(generator, node);
    const loc = node.loc;
    const beforeMessage = createPostMessageCall(createStartedRunningSyncStatementEvent(contentForCallStack, node[nodeId], loc))
    const afterMessage = createPostMessageCall(createEndedFunctionExecution(contentForCallStack, node[nodeId]))
    return [
        parser.parse(beforeMessage),
        node,
        parser.parse(afterMessage)
    ]
}
