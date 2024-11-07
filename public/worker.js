console.log("Worker started")
addEventListener('message', event => {
    const {kind} = event.data;
    if (kind === "run") {
        const {code} = event.data;
        eval(code)
    }
});