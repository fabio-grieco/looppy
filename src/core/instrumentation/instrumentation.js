import {getExpressionKind} from "./common/instrumentationUtils.js";
import {instrumentForStatement} from "./features/instrumentForStatement.js";
import {instrumentConsoleLog} from "./features/instrumentConsoleLog.js";
import {instrumentSetTimeout} from "./features/instrumentSetTimeout.js";
import {instrumentPromise} from "./features/instrumentPromise.js";
import {instrumentAddEventListener} from "./features/instrumentAddEventListener.js";
import {instrumentButtonClick} from "./features/instrumentButtonClick.js";
import {instrumentRequestAnimationFrame} from "./features/instrumentRequestAnimationFrame.js";
import {instrumentFunctionCall} from "./features/instrumentFunctionCall.js";

let parser
let generator

export const nodeId = Symbol('nodeId')

const instrumentNode = (node) => {
    const mapNodeKindToInstrumentation = {
        "ForLoop": instrumentForStatement(parser, generator),
        "ConsoleLog": instrumentConsoleLog(parser, generator),
        "SetTimeout": instrumentSetTimeout(parser, generator),
        "PromiseExpression": instrumentPromise(parser, generator),
        "AddEventListener": instrumentAddEventListener(parser, generator),
        "ButtonClick": instrumentButtonClick(parser, generator),
        "RequestAnimationFrame": instrumentRequestAnimationFrame(parser, generator),
        "FunctionCall": instrumentFunctionCall(parser, generator),
        "Unhandled": x => x,
    }

    const expressionKind = getExpressionKind(node)
    return mapNodeKindToInstrumentation[expressionKind](node, instrumentNode)
}

function instrument(parseTree) {
    const newParseTree = JSON.parse(JSON.stringify(parseTree))
    return {
        ...newParseTree,
        body: newParseTree.body.flatMap(instrumentNode)
    };
}

export const createInstrumentation = (parserImplementation, generatorImplementation) => {
    parser = parserImplementation
    generator = generatorImplementation
    return instrument
}
