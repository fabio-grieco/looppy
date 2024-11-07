import {nodeId} from "../instrumentation.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {createPostMessageCall} from "../common/instrumentationUtils.js";
import {createConsoleLog} from "../../events/creators/createConsoleLog.js";

export const instrumentConsoleLog = parser => node => {
    node[nodeId] = node["nodeId"]
    const loc = node.loc;
    const beforeMessage = createPostMessageCall(createConsoleLog(node[nodeId], node.expression.arguments[0].value, loc))
    const afterMessage = createPostMessageCall(createEndedFunctionExecution("Console", node[nodeId]))
    return [
        parser.parse(beforeMessage),
        node,
        parser.parse(afterMessage)
    ]
};
