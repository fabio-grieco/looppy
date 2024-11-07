import {nodeId} from "../instrumentation.js";
import {createRunRequestAnimationFrame} from "../../events/creators/createRunRequestAnimationFrame.js";
import {createEndedFunctionExecution} from "../../events/creators/createEndedFunctionExecution.js";
import {instrumentCallback} from "../common/instrumentCallback.js";
import {createPostMessageCall, getCallback, getCallbackTextIdentifier} from "../common/instrumentationUtils.js";
import {createRunRafCallback} from "../../events/creators/createRunRafCallback.js";

export const instrumentRequestAnimationFrame = (parser, generator) => (node, instrumentNode) => {
   const instrumentRafCallback = instrumentCallback(parser, generator)
   node[nodeId] = node["nodeId"]
   const loc = node.loc
   const callback = getCallback(node)
   const rafCallbackIdentifier = getCallbackTextIdentifier(generator, callback)
   const beforeMessage = createPostMessageCall(createRunRequestAnimationFrame(node[nodeId], rafCallbackIdentifier, loc))
   const afterMessage = createPostMessageCall(createEndedFunctionExecution(node?.expression?.callee.name, node[nodeId]))
   return [
      parser.parse(beforeMessage),
      instrumentRafCallback(node, instrumentNode, createRunRafCallback),
      parser.parse(afterMessage)
   ]
};
