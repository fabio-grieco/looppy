export const createGenerator = ({generateFn}) => ({
    generate: parseTree => generateFn(parseTree)
})