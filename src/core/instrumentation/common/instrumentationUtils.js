export function isForStatement(expression) {
    return expression.type === 'ForStatement';
}

export function isConsoleLog(node) {
    return node.expression?.callee?.object?.name === 'console';
}

export function isCallExpression(node) {
    return node.expression?.type === 'CallExpression';
}

export function isSetTimeout(node) {
    return node.expression?.callee?.name === 'setTimeout';
}

export function isPromiseExpression(node) {
    return node.expression?.callee?.object?.callee?.name === 'Promise' || node.expression?.callee?.object?.callee?.object?.name === "Promise"
}

export function isAddEventListener(node) {
    return node.expression?.callee?.property?.name === 'addEventListener';
}

export function isButtonClick(node) {
    return node.expression?.callee?.property?.name === 'click';
}

export function isRequestAnimationFrame(node) {
    return node.expression?.callee?.name === 'requestAnimationFrame';
}

export function getExpressionKind(node) {
    if (isForStatement(node)) {
        return "ForLoop";
    }

    if (isConsoleLog(node)) {
        return "ConsoleLog"
    }

    if (isSetTimeout(node)) {
        return "SetTimeout"
    }

    if (isPromiseExpression(node)) {
        return "PromiseExpression"
    }

    if (isAddEventListener(node)) {
        return "AddEventListener"
    }

    if (isButtonClick(node)) {
        return "ButtonClick"
    }

    if (isRequestAnimationFrame(node)) {
        return "RequestAnimationFrame"
    }

    if (isCallExpression(node)) {
        return "FunctionCall"
    }

    return "Unhandled"
}

export function getCallback(node) {
    return node.expression.arguments[0];
}

export function isArrowFunction(callback) {
    return callback.type === "ArrowFunctionExpression";
}

export function createPostMessageCall(message) {
    return `postMessage(${JSON.stringify(message)});`;
}

export function getCallbackTextIdentifier(generator, callback) {
    return isArrowFunction(callback) ? `(${generator.generate(callback)})` : callback.id.name;
}
