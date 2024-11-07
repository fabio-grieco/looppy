import {nodeId} from "../instrumentation.js";
import {createStartedRunningSyncStatementEvent} from "../../events/creators/createStartedRunningSyncStatement.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createPostMessageCall} from "../common/instrumentationUtils.js";

function getStatementNameInCallStack(generator, node) {
    return `for (${generator.generate(node.init)} ${generator.generate(node.test)}; ${generator.generate(node.update)}) {...}`;
}

export const instrumentForStatement = (parser, generator) => (node, instrumentNode) => {
    node[nodeId] = node["nodeId"]
    node.body.body = node.body.body.flatMap(instrumentNode)
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
