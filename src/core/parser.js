export const createParser = ({parseScriptFn}) => ({
    parse: program => parseScriptFn(program)
})