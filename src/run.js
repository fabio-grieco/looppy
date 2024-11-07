import {parser} from "./adapters/parser.js";
import {attachNodeIds} from "./core/instrumentation/attachNodeIds.js";
import {generator} from "./adapters/generator.js";
import {eventKinds} from "./core/events/kinds.js";
import {onMessage} from "./core/messageHandler.js";
import {state} from "./adapters/state.js";
import {createInstrumentation} from "./core/instrumentation/instrumentation.js";

function listenToDOMEventsToForward(onMessage, worker) {
    document.addEventListener('click', (event) => {
        if (event.target.id === 'myButton') {
            onMessage({
                kind: eventKinds.USER_EVENT,
                element: `#${event.target.id}`,
                type: event.type,
            })
            worker.postMessage({kind: 'user-event', element: '#myButton', eventKind: 'click'})
        }
    })
}

function runProgram(generatedCode, onMessage) {
    const worker = new Worker("worker.js")
    listenToDOMEventsToForward(onMessage, worker);
    worker.addEventListener('message', event => {
        onMessage(event.data)
    });
    setTimeout(() => {
        console.log("Sending start message to worker")
        worker.postMessage({kind: "run", code: generatedCode})
    }, 0)
}

export function ingestProgram(program) {
    const parseTree = parser.parse(program)
    attachNodeIds(parseTree)
    const instrument = createInstrumentation(parser, generator)
    const instrumentedTree = instrument(parseTree)
    const generatedCode = generator.generate(instrumentedTree)
    const handleMessageFromWorker = (message) => onMessage(state.value, message)
    runProgram(generatedCode, handleMessageFromWorker);
    return parseTree
}
