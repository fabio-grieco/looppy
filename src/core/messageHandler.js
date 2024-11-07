import {handleRunTask} from "./handlers/runTaskHandler.js";
import {handleRunSetTimeout} from "./handlers/runSetTimeoutHandler.js";
import {handleStartedSyncStatement} from "./handlers/startedSyncStatementHandler.js";
import {handleFinishedSyncStatement} from "./handlers/finishedSyncStatementHandler.js";
import {handleConsoleLog} from "./handlers/consoleLogHandler.js";
import {handleRunPromiseExpression} from "./handlers/runPromiseExpressionHandler.js";
import {handleResolvedPromise} from "./handlers/resolvedPromiseExpressionHandler.js";
import {handleRunMicrotask} from "./handlers/runMicrotaskHandler.js";
import {eventKinds} from "./events/kinds.js";
import {handleAddedEventListener} from "./handlers/addEventListenerHandler.js";
import {handleDOMEvent} from "./handlers/DOMEventHandler.js";
import {handleRunRequestAnimationFrame} from "./handlers/runRequestAnimationFrameHandler.js";
import {handleRunRequestAnimationFrameCallback} from "./handlers/runRequestAnimationFrameCallbackHandler.js";

const mapEventKindToHandler = {
    [eventKinds.RUN_TIMER_CALLBACK]: handleRunTask,
    [eventKinds.RUN_SET_TIMEOUT]: handleRunSetTimeout,
    [eventKinds.STARTED_RUNNING_SYNC_STATEMENT]: handleStartedSyncStatement,
    [eventKinds.ENDED_FUNCTION_EXECUTION]: handleFinishedSyncStatement,
    [eventKinds.CONSOLE_LOG]: handleConsoleLog,
    [eventKinds.RUN_PROMISE]: handleRunPromiseExpression,
    [eventKinds.RUN_REQUEST_ANIMATION_FRAME]: handleRunRequestAnimationFrame,
    [eventKinds.ADD_EVENT_LISTENER]: handleAddedEventListener,
    [eventKinds.RUN_PROMISE_CALLBACK]: handleRunMicrotask,
    [eventKinds.RUN_RAF_CALLBACK]: handleRunRequestAnimationFrameCallback,
    [eventKinds.RUN_EVENT_CALLBACK]: handleRunTask,
    [eventKinds.RESOLVED_PROMISE]: handleResolvedPromise,
    [eventKinds.USER_EVENT]: handleDOMEvent,
    [eventKinds.EVENT_DISPATCHED_FROM_JS]: handleDOMEvent,
}

export function onMessage(state, message) {
    mapEventKindToHandler[message.kind](state, message)
}
