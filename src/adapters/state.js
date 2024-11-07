import {proxyWithHistory} from 'valtio-history'

export const state = proxyWithHistory({
    runningNodeLoc: null,
    callStack: [],
    webApis: {
        timers: [],
        promises: [],
        eventListeners: {},
    },
    queues: {
        taskQueue: [],
        microtaskQueue: [],
        animationQueue: [],
    },
    eventLoopQueuePopCount: 0,
    console: [],
    eventCount: 0,
})
